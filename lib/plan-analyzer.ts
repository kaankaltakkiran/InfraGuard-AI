export interface ParsedResource {
  address: string;
  type: string;
  name: string;
  action: "create" | "update" | "delete" | "replace" | "no-op";
  changes: Record<string, { before: unknown; after: unknown }>;
}

export interface RiskItem {
  id: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  category: "security" | "cost" | "reliability" | "style";
  resource: string;
  title: string;
  description: string;
  remediation: string;
}

export interface PlanAnalysisResult {
  summary: {
    toCreate: number;
    toUpdate: number;
    toDelete: number;
    toReplace: number;
  };
  resources: ParsedResource[];
  risks: RiskItem[];
  costImpact: {
    level: "low" | "medium" | "high" | "unknown";
    description: string;
    estimatedDelta?: string;
  };
  recommendation: "approve" | "review" | "block";
  recommendationReason: string;
}

const EXPENSIVE_RESOURCE_TYPES = [
  "aws_instance",
  "aws_db_instance",
  "aws_rds_cluster",
  "aws_elasticache_cluster",
  "aws_elasticsearch_domain",
  "aws_nat_gateway",
  "google_compute_instance",
  "azurerm_virtual_machine",
];

export function analyzePlan(raw: string): PlanAnalysisResult {
  const resources = parsePlanText(raw);
  const risks = detectRisks(resources, raw);

  const summary = {
    toCreate: resources.filter((r) => r.action === "create").length,
    toUpdate: resources.filter((r) => r.action === "update").length,
    toDelete: resources.filter((r) => r.action === "delete").length,
    toReplace: resources.filter((r) => r.action === "replace").length,
  };

  const hasExpensive = resources.some((r) =>
    EXPENSIVE_RESOURCE_TYPES.some((t) => r.type.includes(t))
  );
  const hasCreates = summary.toCreate > 0;
  const costImpact = {
    level: (hasExpensive && hasCreates ? "high" : hasExpensive ? "medium" : "low") as
      | "low"
      | "medium"
      | "high",
    description: hasExpensive
      ? `${resources.filter((r) => EXPENSIVE_RESOURCE_TYPES.some((t) => r.type.includes(t))).length} compute/database resource(s) detected — review for unexpected cost changes`
      : "No expensive resource types detected",
    estimatedDelta: hasExpensive ? "Estimate not available — connect Infracost for precise costs" : undefined,
  };

  const criticalRisks = risks.filter((r) => r.severity === "critical");
  const highRisks = risks.filter((r) => r.severity === "high");
  const deletions = resources.filter((r) => r.action === "delete" || r.action === "replace");

  let recommendation: "approve" | "review" | "block" = "approve";
  let recommendationReason = "No significant risks detected. Safe to approve.";

  if (criticalRisks.length > 0) {
    recommendation = "block";
    recommendationReason = `${criticalRisks.length} critical risk(s) detected. Must be resolved before merge.`;
  } else if (highRisks.length > 0 || deletions.length > 0) {
    recommendation = "review";
    recommendationReason = `${highRisks.length} high severity risk(s) or ${deletions.length} resource deletion(s) require manual review.`;
  } else if (risks.length > 0) {
    recommendation = "review";
    recommendationReason = `${risks.length} risk(s) detected. Review before merge.`;
  }

  return { summary, resources, risks, costImpact, recommendation, recommendationReason };
}

function parsePlanText(raw: string): ParsedResource[] {
  const resources: ParsedResource[] = [];
  const lines = raw.split("\n");

  const actionPatterns: Array<[RegExp, ParsedResource["action"]]> = [
    [/^\s*#\s+([\w.[\]"]+)\s+will be created/i, "create"],
    [/^\s*#\s+([\w.[\]"]+)\s+will be updated in-place/i, "update"],
    [/^\s*#\s+([\w.[\]"]+)\s+will be destroyed/i, "delete"],
    [/^\s*#\s+([\w.[\]"]+)\s+must be replaced/i, "replace"],
    [/^\s*#\s+([\w.[\]"]+)\s+is tainted/i, "replace"],
  ];

  for (const line of lines) {
    for (const [pattern, action] of actionPatterns) {
      const match = line.match(pattern);
      if (match) {
        const address = match[1];
        const parts = address.split(".");
        const type = parts.slice(0, -1).join(".");
        const name = parts[parts.length - 1];
        resources.push({ address, type, name, action, changes: {} });
        break;
      }
    }
  }

  if (resources.length === 0) {
    try {
      const json = JSON.parse(raw);
      if (json.resource_changes) {
        for (const rc of json.resource_changes) {
          const actions: string[] = rc.change?.actions ?? [];
          let action: ParsedResource["action"] = "no-op";
          if (actions.includes("create") && actions.includes("delete")) action = "replace";
          else if (actions.includes("create")) action = "create";
          else if (actions.includes("delete")) action = "delete";
          else if (actions.includes("update")) action = "update";
          resources.push({
            address: rc.address,
            type: rc.type ?? "",
            name: rc.name ?? "",
            action,
            changes: {},
          });
        }
      }
    } catch {
      /* not JSON — that's fine */
    }
  }

  return resources;
}

function detectRisks(resources: ParsedResource[], raw: string): RiskItem[] {
  const risks: RiskItem[] = [];
  const rawLower = raw.toLowerCase();

  for (const resource of resources) {
    const addr = resource.address.toLowerCase();
    const rtype = resource.type.toLowerCase();

    if (resource.action === "delete" || resource.action === "replace") {
      if (EXPENSIVE_RESOURCE_TYPES.some((t) => rtype.includes(t.toLowerCase()))) {
        risks.push({
          id: `destroy-${resource.address}`,
          severity: "high",
          category: "reliability",
          resource: resource.address,
          title: `${resource.action === "replace" ? "Replacement" : "Destruction"} of production resource`,
          description: `${resource.address} will be ${resource.action === "replace" ? "replaced (destroy + create)" : "permanently deleted"}. This may cause downtime.`,
          remediation:
            "Verify this is intentional. Consider lifecycle rules (prevent_destroy) for production resources.",
        });
      }
    }

    if (rtype.includes("s3_bucket") || rtype.includes("storage_bucket")) {
      if (
        rawLower.includes("acl") &&
        (rawLower.includes('"public"') || rawLower.includes("public-read"))
      ) {
        risks.push({
          id: `public-s3-${resource.address}`,
          severity: "critical",
          category: "security",
          resource: resource.address,
          title: "Public S3/storage bucket ACL detected",
          description:
            "This storage bucket may be configured with a public ACL, exposing its contents to the internet.",
          remediation:
            'Set acl = "private" and configure aws_s3_bucket_public_access_block with block_public_acls = true.',
        });
      }

      if (!rawLower.includes("server_side_encryption") && resource.action === "create") {
        risks.push({
          id: `encryption-${resource.address}`,
          severity: "medium",
          category: "security",
          resource: resource.address,
          title: "Storage bucket may lack server-side encryption",
          description:
            "No server-side encryption configuration detected for this storage resource.",
          remediation:
            "Add server_side_encryption_configuration with aws:kms algorithm and a CMK.",
        });
      }
    }

    if (rtype.includes("security_group")) {
      if (
        rawLower.includes('"0.0.0.0/0"') &&
        (rawLower.includes("ingress") || rawLower.includes("cidr"))
      ) {
        risks.push({
          id: `open-sg-${resource.address}`,
          severity: "high",
          category: "security",
          resource: resource.address,
          title: "Security group open to 0.0.0.0/0",
          description:
            "This security group allows inbound traffic from any IP address, which is rarely intended for production.",
          remediation:
            "Restrict cidr_blocks to specific IP ranges or use security group references instead.",
        });
      }
    }

    if (rtype.includes("iam_policy") || rtype.includes("iam_role")) {
      if (rawLower.includes('"*"') && rawLower.includes("action")) {
        risks.push({
          id: `wildcard-iam-${resource.address}`,
          severity: "high",
          category: "security",
          resource: resource.address,
          title: "IAM policy with wildcard (*) action",
          description:
            "This IAM policy grants all actions on resources, which violates the principle of least privilege.",
          remediation:
            'Replace Action: "*" with specific actions required by the role (e.g., s3:GetObject, ec2:DescribeInstances).',
        });
      }
    }

    if (rtype.includes("db_instance") || rtype.includes("rds")) {
      if (rawLower.includes("publicly_accessible") && rawLower.includes("true")) {
        risks.push({
          id: `public-rds-${resource.address}`,
          severity: "critical",
          category: "security",
          resource: resource.address,
          title: "RDS instance publicly accessible",
          description:
            "This database instance is configured to be accessible from the public internet.",
          remediation: "Set publicly_accessible = false and use VPC private subnets.",
        });
      }
    }

    if (rtype.includes("instance") && resource.action === "create") {
      risks.push({
        id: `cost-compute-${resource.address}`,
        severity: "info",
        category: "cost",
        resource: resource.address,
        title: "New compute resource",
        description: "A new compute instance is being created. Verify the instance type is appropriate for the workload.",
        remediation: "Review the instance_type and consider using spot/preemptible instances for non-critical workloads.",
      });
    }

    if (
      (rtype.includes("aws_") || rtype.includes("google_") || rtype.includes("azurerm_")) &&
      resource.action === "create" &&
      !rawLower.includes("tags") &&
      !addr.includes("tag")
    ) {
      risks.push({
        id: `no-tags-${resource.address}`,
        severity: "low",
        category: "style",
        resource: resource.address,
        title: "Resource may be missing tags",
        description: "No tags detected on this resource, which makes cost attribution and resource discovery harder.",
        remediation:
          'Add a tags block with at minimum: Environment, Team, and Project keys.',
      });
    }
  }

  return risks;
}

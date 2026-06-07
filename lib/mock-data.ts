import type { PRReviewSummary, UseCase, WorkflowStep } from "@/types";

export const mockPRReview: PRReviewSummary = {
  repo: "acme-corp/infrastructure",
  pr: 247,
  branch: "feat/new-storage-buckets",
  author: "sarah-chen",
  timestamp: "2 minutes ago",
  security: {
    findings: [
      {
        id: "aws-s3-001",
        severity: "high",
        rule: "aws-s3-block-public-acls",
        description: "S3 bucket has public ACL enabled. This exposes all bucket contents to the internet.",
        file: "modules/storage/main.tf",
        line: 42,
        tool: "tfsec",
        remediation: "Set block_public_acls = true in aws_s3_bucket_public_access_block",
      },
      {
        id: "aws-s3-002",
        severity: "medium",
        rule: "aws-s3-encryption-customer-key",
        description: "S3 bucket is not using server-side encryption with customer managed keys.",
        file: "modules/storage/main.tf",
        line: 38,
        tool: "checkov",
        remediation: "Add server_side_encryption_configuration block with aws:kms algorithm",
      },
      {
        id: "aws-iam-001",
        severity: "medium",
        rule: "aws-iam-no-policy-wildcards",
        description: "IAM policy contains wildcard action (*) which grants excessive permissions.",
        file: "modules/iam/policy.tf",
        line: 18,
        tool: "tfsec",
        remediation: "Replace wildcard with specific actions: s3:GetObject, s3:PutObject",
      },
    ],
    counts: {
      critical: 0,
      high: 1,
      medium: 2,
      low: 0,
      info: 1,
    },
  },
  cost: {
    monthlyTotal: 420,
    prDelta: 84,
    changes: [
      {
        resource: "aws_s3_bucket.data_lake",
        type: "S3 Standard Storage (500 GB)",
        monthlyBefore: 0,
        monthlyAfter: 11.5,
        delta: 11.5,
      },
      {
        resource: "aws_instance.processor",
        type: "EC2 m5.2xlarge (on-demand)",
        monthlyBefore: 248,
        monthlyAfter: 320,
        delta: 72,
      },
      {
        resource: "aws_rds_instance.analytics",
        type: "RDS db.r5.large Multi-AZ",
        monthlyBefore: 336,
        monthlyAfter: 336,
        delta: 0,
      },
    ],
  },
  style: {
    issues: [
      {
        type: "fmt",
        file: "modules/network/main.tf",
        message: "terraform fmt failed — inconsistent indentation detected",
        severity: "error",
      },
      {
        type: "lint",
        file: "variables.tf",
        line: 12,
        message: "tflint: variable 'bucket_name' is missing description",
        severity: "warning",
      },
      {
        type: "lint",
        file: "outputs.tf",
        line: 5,
        message: "tflint: output 'bucket_arn' is missing description",
        severity: "warning",
      },
    ],
    fmtFailed: true,
    lintWarnings: 2,
  },
  recommendation: "block",
  recommendationReason:
    "1 high severity security finding requires remediation before merge. Public S3 bucket access poses significant data exposure risk.",
};

export const useCases: UseCase[] = [
  {
    id: "platform",
    team: "Platform Engineering",
    icon: "Server",
    tagline: "Standardize infrastructure review across all repos",
    benefits: [
      "Enforce consistent security policies at scale",
      "Reduce review bottlenecks for platform teams",
      "Track compliance across 50+ Terraform repos",
    ],
    accentColor: "violet",
  },
  {
    id: "security",
    team: "Security Teams",
    icon: "Shield",
    tagline: "Catch infrastructure risks before they reach production",
    benefits: [
      "Shift-left security with every PR",
      "Automatic tfsec and Checkov analysis",
      "Prioritized findings by severity level",
    ],
    accentColor: "emerald",
  },
  {
    id: "devops",
    team: "DevOps Engineers",
    icon: "GitPullRequest",
    tagline: "Review Terraform changes faster with less CI noise",
    benefits: [
      "One comment instead of 6 CI job logs",
      "Direct file and line references",
      "Clear remediation suggestions",
    ],
    accentColor: "sky",
  },
  {
    id: "finops",
    team: "FinOps Teams",
    icon: "TrendingUp",
    tagline: "Catch cost spikes before they hit your cloud bill",
    benefits: [
      "Infracost-powered monthly estimates",
      "PR-level cost delta visibility",
      "Expensive resource change alerts",
    ],
    accentColor: "amber",
  },
  {
    id: "engineering",
    team: "Engineering Managers",
    icon: "BarChart3",
    tagline: "Give teams context to approve infrastructure changes confidently",
    benefits: [
      "Non-experts can understand infrastructure impact",
      "AI plain-language summaries of scanner output",
      "Configurable enforcement from day one",
    ],
    accentColor: "indigo",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    label: "Pull Request Opened",
    description: "A developer opens or updates a PR containing Terraform file changes",
    icon: "GitPullRequest",
  },
  {
    id: 2,
    label: "Terraform Detected",
    description: "GitHub Actions workflow triggers automatically on .tf file changes",
    icon: "FileCode",
  },
  {
    id: 3,
    label: "Scanners Run",
    description: "tfsec, Checkov, Infracost, and tflint execute in parallel",
    icon: "ScanLine",
  },
  {
    id: 4,
    label: "Findings Normalized",
    description: "Raw scanner JSON is parsed, deduplicated, and ranked by severity",
    icon: "Filter",
  },
  {
    id: 5,
    label: "AI Explains Impact",
    description: "Claude summarizes each finding in plain language with remediation steps",
    icon: "Sparkles",
  },
  {
    id: 6,
    label: "PR Comment Updated",
    description: "One structured comment appears on the PR with all findings and context",
    icon: "MessageSquare",
  },
];

export const problemItems = [
  {
    icon: "Lock",
    title: "Hidden IAM Changes",
    description: "A two-line policy change can silently grant overly broad permissions.",
    color: "red",
  },
  {
    icon: "Globe",
    title: "Public Exposure Risk",
    description: "One misconfigured attribute can expose storage buckets to the internet.",
    color: "red",
  },
  {
    icon: "Database",
    title: "Missing Encryption",
    description: "Databases and storage can be provisioned without encryption by default.",
    color: "amber",
  },
  {
    icon: "TrendingUp",
    title: "Invisible Cost Spikes",
    description: "Resizing an instance looks small in a diff but adds thousands monthly.",
    color: "amber",
  },
  {
    icon: "Terminal",
    title: "Too Much CI Output",
    description: "6 scanner jobs produce hundreds of lines reviewers never fully read.",
    color: "slate",
  },
  {
    icon: "AlertCircle",
    title: "No Unified Context",
    description: "Security, cost, and style issues live in separate tools with no single view.",
    color: "slate",
  },
];

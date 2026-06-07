export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

export interface SecurityFinding {
  id: string;
  severity: SeverityLevel;
  rule: string;
  description: string;
  file: string;
  line?: number;
  tool: "tfsec" | "checkov";
  remediation?: string;
}

export interface CostChange {
  resource: string;
  type: string;
  monthlyBefore: number;
  monthlyAfter: number;
  delta: number;
}

export interface StyleIssue {
  type: "fmt" | "lint";
  file: string;
  line?: number;
  message: string;
  severity: "warning" | "error";
}

export interface PRReviewSummary {
  repo: string;
  pr: number;
  branch: string;
  author: string;
  timestamp: string;
  security: {
    findings: SecurityFinding[];
    counts: Record<SeverityLevel, number>;
  };
  cost: {
    monthlyTotal: number;
    prDelta: number;
    changes: CostChange[];
  };
  style: {
    issues: StyleIssue[];
    fmtFailed: boolean;
    lintWarnings: number;
  };
  recommendation: "approve" | "review" | "block";
  recommendationReason: string;
}

export interface UseCase {
  id: string;
  team: string;
  icon: string;
  tagline: string;
  benefits: string[];
  accentColor: string;
}

export interface WorkflowStep {
  id: number;
  label: string;
  description: string;
  icon: string;
}

"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  CheckCircle2,
  Info,
  Shield,
  TrendingUp,
  Code2,
  Zap,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  RefreshCcw,
  Copy,
  Check,
} from "lucide-react";
import { analyzePlan, type PlanAnalysisResult, type RiskItem } from "@/lib/plan-analyzer";
import SeverityBadge from "./SeverityBadge";
import { cn } from "@/lib/utils";
import type { SeverityLevel } from "@/types";

const EXAMPLE_PLAN = `Terraform will perform the following actions:

  # aws_s3_bucket.data_lake will be created
  + resource "aws_s3_bucket" "data_lake" {
      + acl           = "public-read"
      + bucket        = "acme-data-lake-prod"
      + force_destroy = false
    }

  # aws_instance.processor will be updated in-place
  ~ resource "aws_instance" "processor" {
      ~ instance_type = "m5.xlarge" -> "m5.2xlarge"
        id            = "i-0a1b2c3d4e5f"
    }

  # aws_security_group.web will be created
  + resource "aws_security_group" "web" {
      + ingress {
          + cidr_blocks = ["0.0.0.0/0"]
          + from_port   = 22
          + to_port     = 22
          + protocol    = "tcp"
        }
    }

  # aws_iam_policy.app_policy will be created
  + resource "aws_iam_policy" "app_policy" {
      + policy = jsonencode({
          Action   = "*"
          Effect   = "Allow"
          Resource = "*"
        })
    }

Plan: 3 to add, 1 to change, 0 to destroy.`;

const severityIconMap: Record<
  SeverityLevel,
  { icon: React.ElementType; color: string }
> = {
  critical: { icon: AlertOctagon, color: "text-red-400" },
  high: { icon: AlertTriangle, color: "text-orange-400" },
  medium: { icon: AlertCircle, color: "text-amber-400" },
  low: { icon: Info, color: "text-sky-400" },
  info: { icon: Info, color: "text-slate-400" },
};

const categoryIconMap: Record<string, { icon: React.ElementType; color: string }> = {
  security: { icon: Shield, color: "text-red-400" },
  cost: { icon: TrendingUp, color: "text-amber-400" },
  reliability: { icon: AlertTriangle, color: "text-orange-400" },
  style: { icon: Code2, color: "text-sky-400" },
};

const actionConfig = {
  create: { label: "CREATE", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Plus },
  update: { label: "UPDATE", color: "text-amber-400", bg: "bg-amber-500/10", icon: RefreshCcw },
  delete: { label: "DELETE", color: "text-red-400", bg: "bg-red-500/10", icon: Minus },
  replace: { label: "REPLACE", color: "text-orange-400", bg: "bg-orange-500/10", icon: RefreshCcw },
  "no-op": { label: "NO-OP", color: "text-slate-500", bg: "bg-slate-500/10", icon: CheckCircle2 },
};

const recommendationConfig = {
  approve: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/10",
    label: "Safe to Approve",
  },
  review: {
    icon: AlertTriangle,
    color: "text-amber-400",
    border: "border-amber-500/25",
    bg: "bg-amber-500/10",
    label: "Review Required",
  },
  block: {
    icon: AlertOctagon,
    color: "text-red-400",
    border: "border-red-500/25",
    bg: "bg-red-500/10",
    label: "Do Not Merge",
  },
};

export default function PlanAnalyzer() {
  const [mode, setMode] = useState<"idle" | "text" | "upload">("idle");
  const [planText, setPlanText] = useState("");
  const [result, setResult] = useState<PlanAnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const analyze = useCallback((text: string) => {
    if (!text.trim()) return;
    const analysis = analyzePlan(text);
    setResult(analysis);
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setPlanText(content);
        analyze(content);
        setMode("text");
      };
      reader.readAsText(file);
    },
    [analyze]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const loadExample = () => {
    setPlanText(EXAMPLE_PLAN);
    setMode("text");
    analyze(EXAMPLE_PLAN);
  };

  const reset = () => {
    setResult(null);
    setPlanText("");
    setMode("idle");
  };

  const copyResult = () => {
    if (!result) return;
    const text = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="plan-analyzer" className="relative section-padding overflow-hidden bg-navy-800/30">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            Try It Now
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            Analyze your Terraform plan
            <br />
            <span className="gradient-text">instantly, right here</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Paste your <code className="text-violet-400 font-mono text-sm">terraform plan</code> output
            or upload a plan file. Get an instant risk analysis — no backend, no sign-up.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Mode picker */}
                {mode === "idle" && (
                  <div className="space-y-4">
                    {/* Drop zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 cursor-pointer transition-all duration-300",
                        isDragging
                          ? "border-violet-500/60 bg-violet-500/10 shadow-glow-violet"
                          : "border-white/[0.12] hover:border-violet-500/40 hover:bg-violet-500/5"
                      )}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.json,.tfplan,text/plain,application/json"
                        className="sr-only"
                        onChange={handleFileInput}
                      />
                      <div className={cn(
                        "p-4 rounded-full transition-all duration-300",
                        isDragging ? "bg-violet-500/20" : "bg-white/5"
                      )}>
                        <Upload className={cn(
                          "w-8 h-8 transition-colors",
                          isDragging ? "text-violet-400" : "text-slate-500"
                        )} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-300 mb-1">
                          {isDragging ? "Drop your plan file here" : "Drop your plan file or click to upload"}
                        </p>
                        <p className="text-xs text-slate-600">
                          Accepts .txt, .json, or raw terraform plan output
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <span className="text-xs text-slate-600 font-medium">or</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>

                    {/* Action buttons */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setMode("text")}
                        className="flex items-center justify-center gap-2.5 glass rounded-xl px-5 py-4 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all group"
                      >
                        <FileText className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
                        Paste plan output
                      </button>
                      <button
                        onClick={loadExample}
                        className="flex items-center justify-center gap-2.5 glass rounded-xl px-5 py-4 text-sm font-medium text-slate-300 hover:text-white hover:border-violet-500/30 transition-all group"
                      >
                        <Zap className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
                        Load example plan
                      </button>
                    </div>
                  </div>
                )}

                {/* Text input mode */}
                {mode === "text" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-400">
                        Paste your <code className="text-violet-400 font-mono">terraform plan</code> output
                      </p>
                      <button
                        onClick={() => setMode("idle")}
                        className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                      >
                        ← Back
                      </button>
                    </div>
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={planText}
                        onChange={(e) => setPlanText(e.target.value)}
                        placeholder={`Paste your terraform plan output here...\n\nExample:\n  # aws_s3_bucket.example will be created\n  + resource "aws_s3_bucket" "example" {\n      + bucket = "my-bucket"\n    }`}
                        rows={14}
                        className="w-full bg-navy-900/80 border border-white/[0.08] rounded-xl px-4 py-4 text-sm font-mono text-slate-300 placeholder-slate-700 resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
                        spellCheck={false}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={() => analyze(planText)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!planText.trim()}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow-violet transition-all"
                      >
                        <Shield className="w-4 h-4" />
                        Analyze Plan
                      </motion.button>
                      <button
                        onClick={loadExample}
                        className="px-4 py-3 glass rounded-xl text-sm text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Load example
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnalysisResult result={result} onReset={reset} onCopy={copyResult} copied={copied} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function AnalysisResult({
  result,
  onReset,
  onCopy,
  copied,
}: {
  result: PlanAnalysisResult;
  onReset: () => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const rec = recommendationConfig[result.recommendation];
  const RecIcon = rec.icon;

  const critCount = result.risks.filter((r) => r.severity === "critical").length;
  const highCount = result.risks.filter((r) => r.severity === "high").length;
  const medCount = result.risks.filter((r) => r.severity === "medium").length;
  const lowCount = result.risks.filter((r) => r.severity === "low").length;

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">Analysis complete</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Export JSON
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Analyze another
          </button>
        </div>
      </div>

      {/* Recommendation banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl border",
          rec.bg,
          rec.border
        )}
      >
        <RecIcon className={cn("w-5 h-5 flex-shrink-0", rec.color)} />
        <div>
          <p className={cn("text-sm font-bold", rec.color)}>{rec.label}</p>
          <p className="text-xs text-slate-400 mt-0.5">{result.recommendationReason}</p>
        </div>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "To Create", value: result.summary.toCreate, color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/15" },
          { label: "To Update", value: result.summary.toUpdate, color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/15" },
          { label: "To Delete", value: result.summary.toDelete, color: "text-red-400", bg: "bg-red-500/5 border-red-500/15" },
          { label: "To Replace", value: result.summary.toReplace, color: "text-orange-400", bg: "bg-orange-500/5 border-orange-500/15" },
        ].map((stat) => (
          <div key={stat.label} className={cn("rounded-xl border p-4 text-center", stat.bg)}>
            <p className={cn("text-2xl font-bold tabular-nums", stat.color)}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Risk summary chips */}
      {result.risks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {critCount > 0 && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {critCount} Critical
            </span>
          )}
          {highCount > 0 && <SeverityBadge level="high" size="lg" />}
          {medCount > 0 && <SeverityBadge level="medium" size="lg" />}
          {lowCount > 0 && <SeverityBadge level="low" size="lg" />}
          <span className="text-sm text-slate-500 flex items-center">{result.risks.length} total risks</span>
        </div>
      )}

      {/* Risk list */}
      {result.risks.length > 0 && (
        <div>
          <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-3">Risk Analysis</p>
          <div className="space-y-2">
            {result.risks.map((risk, i) => (
              <RiskCard key={risk.id} risk={risk} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Resource list */}
      {result.resources.length > 0 && (
        <div>
          <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-3">
            Planned Changes ({result.resources.length})
          </p>
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            {result.resources.map((resource, i) => {
              const cfg = actionConfig[resource.action];
              const ActionIcon = cfg.icon;
              return (
                <motion.div
                  key={resource.address}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm",
                    i < result.resources.length - 1 ? "border-b border-white/[0.04]" : ""
                  )}
                >
                  <div className={cn("px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1", cfg.bg, cfg.color)}>
                    <ActionIcon className="w-3 h-3" />
                    {cfg.label}
                  </div>
                  <code className="text-slate-300 text-xs font-mono truncate">{resource.address}</code>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cost impact */}
      <div className={cn(
        "flex items-start gap-3 p-4 rounded-xl border",
        result.costImpact.level === "high"
          ? "bg-amber-500/5 border-amber-500/20"
          : "bg-white/[0.02] border-white/[0.06]"
      )}>
        <TrendingUp className={cn(
          "w-4 h-4 flex-shrink-0 mt-0.5",
          result.costImpact.level === "high" ? "text-amber-400" : "text-slate-500"
        )} />
        <div>
          <p className={cn(
            "text-xs font-semibold mb-1",
            result.costImpact.level === "high" ? "text-amber-400" : "text-slate-400"
          )}>
            Cost Impact: {result.costImpact.level.toUpperCase()}
          </p>
          <p className="text-xs text-slate-500">{result.costImpact.description}</p>
          {result.costImpact.estimatedDelta && (
            <p className="text-xs text-slate-600 mt-1 italic">{result.costImpact.estimatedDelta}</p>
          )}
        </div>
      </div>

      {/* Empty state */}
      {result.risks.length === 0 && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-400">No risks detected</p>
            <p className="text-xs text-slate-500 mt-0.5">
              This is a basic static analysis. For production use, run tfsec, Checkov, and Infracost for comprehensive scanning.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function RiskCard({ risk, index }: { risk: RiskItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityIconMap[risk.severity];
  const cat = categoryIconMap[risk.category] ?? categoryIconMap.security;
  const SevIcon = sev.icon;
  const CatIcon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        <SevIcon className={cn("w-4 h-4 flex-shrink-0", sev.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <SeverityBadge level={risk.severity} size="sm" />
            <span className="text-xs text-slate-400 font-medium truncate">{risk.title}</span>
          </div>
          <p className="text-[11px] text-slate-600 font-mono mt-0.5 truncate">{risk.resource}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 text-[10px] text-slate-600 border border-white/[0.06] rounded px-1.5 py-0.5">
            <CatIcon className={cn("w-3 h-3", cat.color)} />
            {risk.category}
          </div>
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/[0.04] pt-3 space-y-2">
              <p className="text-xs text-slate-400 leading-relaxed">{risk.description}</p>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-400/80">{risk.remediation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

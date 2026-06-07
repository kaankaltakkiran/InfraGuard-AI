"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  GitPullRequest,
} from "lucide-react";

const beforeLines = [
  { text: "tfsec: [HIGH] aws-s3-block-public-acls — main.tf:42", color: "text-red-400" },
  { text: "tfsec: [MEDIUM] aws-s3-no-public-buckets — main.tf:38", color: "text-amber-400" },
  { text: "tfsec: [LOW] aws-s3-versioning-enabled — main.tf:51", color: "text-slate-500" },
  { text: "checkov: PASSED: CKV_AWS_18: S3 bucket logging", color: "text-emerald-500/70" },
  { text: "checkov: FAILED: CKV_AWS_19: S3 bucket encryption", color: "text-red-400" },
  { text: "checkov: FAILED: CKV_AWS_145: S3 KMS key", color: "text-red-400" },
  { text: "infracost breakdown --path .", color: "text-slate-400" },
  { text: "Project: acme-corp/infrastructure", color: "text-slate-500" },
  { text: "OVERALL TOTAL        Monthly cost +$84.23", color: "text-amber-400" },
  { text: "tflint: Warning - Missing description for variable", color: "text-amber-400" },
  { text: "terraform fmt: modules/network/main.tf not formatted", color: "text-red-400" },
];

const afterItems = [
  { icon: "🔴", label: "1 High", detail: "Public S3 bucket — review before merge", color: "text-red-300" },
  { icon: "🟡", label: "2 Medium", detail: "Missing encryption + IAM wildcard", color: "text-amber-300" },
  { icon: "💰", label: "+$84/mo", detail: "EC2 resize: m5.xlarge → m5.2xlarge", color: "text-amber-300" },
  { icon: "📝", label: "3 Style", detail: "fmt + 2 tflint variable warnings", color: "text-sky-300" },
];

const signals = [
  { icon: Layers, label: "6 scanner tools consolidated" },
  { icon: Sparkles, label: "AI-explained in plain language" },
  { icon: GitPullRequest, label: "One PR comment, always up to date" },
];

export default function SolutionSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            One review comment.
            <br />
            <span className="gradient-text">All the important signals.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            InfraGuard AI collects scanner results, cost estimates, and lint output, then
            creates a ranked and readable summary your team can actually act on.
          </p>
        </motion.div>

        {/* Before / After visual */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center mb-16">
          {/* Before — noisy terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Before</span>
              <div className="h-px flex-1 bg-white/[0.05]" />
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-navy-800/60 overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04] bg-navy-900/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-xs text-slate-600 font-mono ml-2">CI Output — 6 jobs</span>
              </div>
              {/* Terminal content */}
              <div className="p-4 font-mono text-xs space-y-1 max-h-64 overflow-hidden relative">
                {beforeLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className={`${line.color} leading-relaxed`}
                  >
                    {line.text}
                  </motion.p>
                ))}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-navy-800/80 to-transparent" />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-600 text-center">Scattered across 6 CI jobs</p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3 py-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-violet-600 rounded-full blur-md opacity-50 animate-pulse-slow" />
              <div className="relative bg-gradient-to-br from-violet-500 to-indigo-600 p-3 rounded-full">
                <ArrowRight className="w-5 h-5 text-white lg:block hidden" />
                <ArrowRight className="w-5 h-5 text-white lg:hidden rotate-90" />
              </div>
            </div>
            <div className="text-center hidden lg:block">
              <p className="text-xs font-semibold text-violet-400">InfraGuard AI</p>
              <p className="text-[10px] text-slate-600">normalizes + explains</p>
            </div>
          </motion.div>

          {/* After — clean summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">After</span>
              <div className="h-px flex-1 bg-white/[0.05]" />
            </div>
            <div className="rounded-xl border border-violet-500/20 bg-navy-800/60 overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.08)]">
              {/* Comment header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04] bg-violet-900/20">
                <div className="w-5 h-5 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-violet-300 font-medium">InfraGuard AI — PR #247</span>
              </div>
              {/* Summary items */}
              <div className="p-4 space-y-2">
                {afterItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + 0.1 * i, duration: 0.4 }}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <span className="text-base leading-none flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">One comment, always current</span>
                </motion.div>
              </div>
            </div>
            <p className="mt-2 text-xs text-emerald-500/70 text-center">One PR comment with full context</p>
          </motion.div>
        </div>

        {/* Signal chips row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {signals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 glass rounded-full px-5 py-2.5"
            >
              <Icon className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-slate-300 font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

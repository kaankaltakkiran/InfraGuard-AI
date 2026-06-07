"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Clock,
  ChevronDown,
  ChevronRight,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Code2,
  Shield,
  GitPullRequest,
  ExternalLink,
} from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import { mockPRReview } from "@/lib/mock-data";

function CollapsibleSection({
  icon: Icon,
  title,
  badge,
  defaultOpen = true,
  children,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  iconColor: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/[0.06] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
        <span className="text-sm font-semibold text-slate-200 flex-1">{title}</span>
        {badge}
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/[0.04]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PullRequestCommentMockup() {
  const review = mockPRReview;

  return (
    <section className="relative section-padding overflow-hidden bg-navy-800/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            What the PR comment
            <br />
            <span className="gradient-text">actually looks like</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A single, always-current comment. Every finding explained. Ready to act on.
          </p>
        </motion.div>

        {/* PR comment mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* GitHub PR context bar */}
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <GitPullRequest className="w-3.5 h-3.5" />
              <span className="text-slate-400">{review.repo}</span>
              <span>/</span>
              <span className="text-violet-400">#{review.pr}</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <code className="text-xs text-slate-600 font-mono">{review.branch}</code>
          </div>

          {/* Main comment card */}
          <div className="rounded-2xl border border-white/[0.08] bg-navy-800/60 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Comment header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05] bg-navy-900/40">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-violet-600 rounded-full blur-sm opacity-50" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-200">infraguard-ai</span>
                  <span className="text-[11px] bg-violet-600/20 text-violet-300 border border-violet-500/20 px-1.5 py-0.5 rounded font-medium">
                    bot
                  </span>
                  <span className="text-[11px] bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-medium">
                    GitHub App
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {review.timestamp} · edited
                </div>
              </div>
            </div>

            {/* Comment body */}
            <div className="p-5 space-y-4">
              {/* Title + summary row */}
              <div>
                <h3 className="text-base font-bold text-slate-100 mb-3">
                  🛡️ Terraform Review Summary
                </h3>

                {/* Summary chips grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-red-500/5 border border-red-500/15">
                    <Shield className="w-4 h-4 text-red-400" />
                    <p className="text-xs font-bold text-red-300">
                      {review.security.counts.high + review.security.counts.critical} findings
                    </p>
                    <p className="text-[10px] text-slate-500">Security</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/15">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <p className="text-xs font-bold text-amber-300">
                      +${review.cost.prDelta}/mo
                    </p>
                    <p className="text-[10px] text-slate-500">Cost delta</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-sky-500/5 border border-sky-500/15">
                    <Code2 className="w-4 h-4 text-sky-400" />
                    <p className="text-xs font-bold text-sky-300">
                      {review.style.issues.length} issues
                    </p>
                    <p className="text-[10px] text-slate-500">Style</p>
                  </div>
                </div>
              </div>

              {/* Security section */}
              <CollapsibleSection
                icon={Shield}
                title="Security Findings"
                iconColor="text-red-400"
                badge={
                  <div className="flex gap-1.5 flex-shrink-0">
                    {review.security.counts.high > 0 && (
                      <SeverityBadge level="high" size="sm" />
                    )}
                    {review.security.counts.medium > 0 && (
                      <SeverityBadge level="medium" size="sm" />
                    )}
                  </div>
                }
              >
                <div className="pt-3 space-y-2.5">
                  {review.security.findings.map((f) => (
                    <div
                      key={f.id}
                      className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {f.severity === "high" ? (
                          <XCircle className="w-4 h-4 text-orange-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <SeverityBadge level={f.severity} size="sm" />
                          <code className="text-xs text-slate-400 font-mono">{f.rule}</code>
                        </div>
                        <p className="text-xs text-slate-300 mb-1">{f.description}</p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-600 font-mono">
                          <ExternalLink className="w-2.5 h-2.5" />
                          {f.file}
                          {f.line && `:${f.line}`}
                        </div>
                        {f.remediation && (
                          <p className="text-[11px] text-emerald-400/70 mt-1.5 pl-2 border-l border-emerald-500/20">
                            Fix: {f.remediation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Cost section */}
              <CollapsibleSection
                icon={DollarSign}
                title="Cost Analysis"
                iconColor="text-amber-400"
                badge={
                  <span className="text-xs font-semibold text-amber-400 flex-shrink-0">
                    +${review.cost.prDelta}/mo
                  </span>
                }
                defaultOpen={false}
              >
                <div className="pt-3">
                  <div className="rounded-lg overflow-hidden border border-white/[0.06]">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                          <th className="text-left px-3 py-2 text-slate-500 font-medium">Resource</th>
                          <th className="text-right px-3 py-2 text-slate-500 font-medium">Before</th>
                          <th className="text-right px-3 py-2 text-slate-500 font-medium">After</th>
                          <th className="text-right px-3 py-2 text-slate-500 font-medium">Delta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {review.cost.changes.map((c, i) => (
                          <tr
                            key={c.resource}
                            className={i < review.cost.changes.length - 1 ? "border-b border-white/[0.03]" : ""}
                          >
                            <td className="px-3 py-2">
                              <p className="text-slate-300 font-mono truncate max-w-[180px]">
                                {c.resource}
                              </p>
                              <p className="text-slate-600 text-[10px]">{c.type}</p>
                            </td>
                            <td className="px-3 py-2 text-right text-slate-500 font-mono">
                              ${c.monthlyBefore.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 text-right text-slate-400 font-mono">
                              ${c.monthlyAfter.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-semibold">
                              <span className={c.delta > 0 ? "text-amber-400" : c.delta < 0 ? "text-emerald-400" : "text-slate-500"}>
                                {c.delta > 0 ? "+" : ""}{c.delta === 0 ? "–" : `$${c.delta.toFixed(2)}`}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-white/[0.06] bg-amber-500/5">
                          <td colSpan={3} className="px-3 py-2 text-slate-400 font-semibold text-xs">
                            Monthly total
                          </td>
                          <td className="px-3 py-2 text-right text-amber-400 font-bold font-mono text-xs">
                            +${review.cost.prDelta}/mo
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Style section */}
              <CollapsibleSection
                icon={Code2}
                title="Style & Quality"
                iconColor="text-sky-400"
                badge={
                  <span className="text-[11px] text-sky-400 flex-shrink-0">
                    {review.style.issues.length} issues
                  </span>
                }
                defaultOpen={false}
              >
                <div className="pt-3 space-y-2">
                  {review.style.issues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      {issue.severity === "error" ? (
                        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs text-slate-300">{issue.message}</p>
                        <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                          {issue.file}
                          {issue.line && `:${issue.line}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Recommendation */}
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/25 rounded-xl">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-300 mb-1">Do not merge</p>
                  <p className="text-xs text-red-300/70">{review.recommendationReason}</p>
                </div>
              </div>

              {/* Passed checks */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/60" />
                <span>1 check passed · Checkov CKV_AWS_18: S3 access logging enabled</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

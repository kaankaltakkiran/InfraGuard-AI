"use client";

import { motion } from "framer-motion";
import { ScanLine, Sparkles, UserCheck, ArrowRight } from "lucide-react";

const columns = [
  {
    icon: ScanLine,
    label: "Deterministic Tools",
    role: "Find the facts",
    description:
      "tfsec, Checkov, Infracost, and tflint produce structured, reproducible output based on policy rules — not AI guesses.",
    examples: ["Security rule violations", "Cost estimates", "Lint errors", "Format failures"],
    color: "emerald",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    icon: Sparkles,
    label: "AI Layer",
    role: "Explains the impact",
    description:
      "Claude reads scanner output and rewrites it as plain language — what the risk is, why it matters, and how to fix it.",
    examples: ["Plain-language summaries", "Remediation steps", "Severity context", "Risk explanation"],
    color: "violet",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    badgeBg: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  },
  {
    icon: UserCheck,
    label: "Human Reviewers",
    role: "Make the final decision",
    description:
      "Engineers see full context in one place and decide whether to approve, request changes, or block the PR.",
    examples: ["Approve PR", "Request changes", "Block on severity", "Override with context"],
    color: "sky",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
  },
];

export default function AIBoundarySection() {
  return (
    <section className="relative section-padding overflow-hidden bg-navy-800/20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/30 to-navy-900 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            AI Boundary
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            AI explains.
            <br />
            <span className="text-slate-400">It does not decide.</span>
          </h2>
        </motion.div>

        {/* Central quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative max-w-3xl mx-auto mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-indigo-600/15 to-violet-600/10 rounded-2xl blur-sm" />
          <div className="relative glass rounded-2xl px-8 py-7 text-center border-violet-500/20">
            <div className="absolute top-4 left-6 text-violet-500/30 text-4xl font-serif leading-none">&ldquo;</div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-200 leading-relaxed">
              Deterministic tools find the facts.{" "}
              <span className="gradient-text">AI explains them.</span>{" "}
              Humans approve the change.
            </p>
            <div className="absolute bottom-4 right-6 text-violet-500/30 text-4xl font-serif leading-none">&rdquo;</div>
          </div>
        </motion.div>

        {/* Three columns */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-start">
          {columns.map((col, i) => {
            const Icon = col.icon;
            return (
              <>
                <motion.div
                  key={col.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="group glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${col.iconBg}`}>
                    <Icon className={`w-6 h-6 ${col.iconColor}`} />
                  </div>

                  {/* Labels */}
                  <h3 className="text-base font-semibold text-slate-200 mb-1">{col.label}</h3>
                  <p className={`text-xs font-semibold mb-3 px-2 py-0.5 rounded-md border inline-block ${col.badgeBg}`}>
                    {col.role}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{col.description}</p>

                  {/* Examples */}
                  <div className="space-y-1.5">
                    {col.examples.map((ex) => (
                      <div key={ex} className="flex items-center gap-2 text-xs text-slate-400">
                        <div className={`w-1 h-1 rounded-full ${col.iconColor} flex-shrink-0`} />
                        {ex}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Animated connector arrow (between columns) */}
                {i < 2 && (
                  <motion.div
                    key={`arrow-${i}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="hidden lg:flex items-center justify-center pt-16"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-500 rounded-full blur-sm opacity-30 animate-pulse-slow" />
                      <ArrowRight className="relative w-5 h-5 text-violet-500/70" />
                    </div>
                  </motion.div>
                )}
              </>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-600 mt-10 max-w-xl mx-auto"
        >
          The AI never invents findings. Every risk, cost change, and style issue traces back to
          a specific scanner rule and line of Terraform code.
        </motion.p>
      </div>
    </section>
  );
}

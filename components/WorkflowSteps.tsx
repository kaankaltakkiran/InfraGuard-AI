"use client";

import { motion } from "framer-motion";
import {
  GitPullRequest,
  FileCode,
  ScanLine,
  Filter,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: GitPullRequest,
    label: "Pull Request Opened",
    description: "A developer opens or updates a PR with Terraform file changes",
    color: "violet",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    ring: "ring-violet-500/30",
  },
  {
    id: 2,
    icon: FileCode,
    label: "Terraform Detected",
    description: "GitHub Actions triggers automatically on .tf file changes",
    color: "indigo",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    ring: "ring-indigo-500/30",
  },
  {
    id: 3,
    icon: ScanLine,
    label: "Scanners Run",
    description: "tfsec, Checkov, Infracost, and tflint execute in parallel",
    color: "sky",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    ring: "ring-sky-500/30",
  },
  {
    id: 4,
    icon: Filter,
    label: "Findings Normalized",
    description: "Raw scanner JSON is parsed, deduplicated, and ranked by severity",
    color: "emerald",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    ring: "ring-emerald-500/30",
  },
  {
    id: 5,
    icon: Sparkles,
    label: "AI Explains Impact",
    description: "AI summarizes each finding in plain language with remediation steps",
    color: "amber",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    ring: "ring-amber-500/30",
  },
  {
    id: 6,
    icon: MessageSquare,
    label: "PR Comment Updated",
    description: "One structured comment appears with all findings and context",
    color: "teal",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
    ring: "ring-teal-500/30",
  },
];

export default function WorkflowSteps() {
  return (
    <section id="demo" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-sky-400 uppercase tracking-widest mb-4 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            From PR to review comment
            <br />
            <span className="text-slate-400">in one automated step</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            InfraGuard AI integrates directly into your GitHub Actions workflow with a single
            configuration file.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-8 left-[calc(100/12*1%)] right-[calc(100/12*1%)] h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="h-full bg-gradient-to-r from-violet-500/50 via-sky-500/50 via-emerald-500/50 to-teal-500/50 origin-left"
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Node */}
                    <div
                      className={`relative w-16 h-16 rounded-full ${step.iconBg} ring-2 ${step.ring} flex items-center justify-center mb-4 flex-shrink-0 z-10 bg-navy-900`}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut",
                        }}
                        className={`absolute inset-0 rounded-full ${step.iconBg} opacity-50`}
                      />
                      <Icon className={`w-6 h-6 ${step.iconColor} relative z-10`} />
                      {/* Step number */}
                      <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-navy-900 border border-white/10 rounded-full flex items-center justify-center">
                        <span className="text-[9px] font-bold text-slate-400">{step.id}</span>
                      </div>
                    </div>
                    <h3 className="text-xs font-semibold text-slate-200 mb-1 leading-tight">
                      {step.label}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4"
              >
                {/* Left — icon + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-12 h-12 rounded-full ${step.iconBg} ring-2 ${step.ring} flex items-center justify-center flex-shrink-0 bg-navy-900`}
                  >
                    <Icon className={`w-5 h-5 ${step.iconColor}`} />
                  </div>
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent my-2 origin-top"
                    />
                  )}
                </div>

                {/* Right — content */}
                <div className="pb-8">
                  <span className="text-[10px] font-mono text-slate-600">Step {step.id}</span>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1">{step.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Actions badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <div className="glass rounded-xl px-6 py-4 flex items-center gap-4 max-w-lg text-sm">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-400">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-200">GitHub Actions integration</p>
              <p className="text-xs text-slate-500">
                One workflow file. Works on every PR automatically.
              </p>
            </div>
            <code className="ml-auto text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-1 rounded hidden sm:block">
              .github/workflows/infraguard.yml
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

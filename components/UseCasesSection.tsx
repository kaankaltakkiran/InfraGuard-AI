"use client";

import { motion } from "framer-motion";
import {
  Server,
  Shield,
  GitPullRequest,
  TrendingUp,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  Server,
  Shield,
  GitPullRequest,
  TrendingUp,
  BarChart3,
};

const useCases = [
  {
    icon: "Server" as keyof typeof iconMap,
    team: "Platform Engineering",
    tagline: "Standardize infrastructure review across all repos",
    benefits: [
      "Enforce consistent security policies at scale",
      "Reduce review bottlenecks for platform teams",
      "Track compliance across 50+ Terraform repos",
    ],
    accentColor: "violet",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/30",
    glowHover: "hover:shadow-glow-violet",
  },
  {
    icon: "Shield" as keyof typeof iconMap,
    team: "Security Teams",
    tagline: "Catch infrastructure risks before they reach production",
    benefits: [
      "Shift-left security with every PR",
      "Automatic tfsec and Checkov analysis",
      "Prioritized findings by severity level",
    ],
    accentColor: "emerald",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/30",
    glowHover: "hover:shadow-glow-emerald",
  },
  {
    icon: "GitPullRequest" as keyof typeof iconMap,
    team: "DevOps Engineers",
    tagline: "Review Terraform changes faster with less CI noise",
    benefits: [
      "One comment instead of 6 CI job logs",
      "Direct file and line number references",
      "Clear remediation suggestions per finding",
    ],
    accentColor: "sky",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    borderHover: "hover:border-sky-500/30",
    glowHover: "hover:shadow-glow-sky",
  },
  {
    icon: "TrendingUp" as keyof typeof iconMap,
    team: "FinOps Teams",
    tagline: "Catch cost spikes before they hit your cloud bill",
    benefits: [
      "Infracost-powered monthly estimates on every PR",
      "PR-level cost delta with resource breakdown",
      "Block expensive changes before merge",
    ],
    accentColor: "amber",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/30",
    glowHover: "hover:shadow-glow-amber",
  },
  {
    icon: "BarChart3" as keyof typeof iconMap,
    team: "Engineering Managers",
    tagline: "Give teams context to approve infrastructure changes confidently",
    benefits: [
      "Non-experts can understand infrastructure impact",
      "AI plain-language summaries of scanner output",
      "Configurable enforcement from day one",
    ],
    accentColor: "indigo",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    borderHover: "hover:border-indigo-500/30",
    glowHover: "",
  },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="relative section-padding overflow-hidden bg-navy-800/20">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/20 to-navy-900 pointer-events-none" />
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
          <span className="inline-block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            Use Cases
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            Built for the teams who
            <br />
            <span className="gradient-text">own infrastructure</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Whether you manage one Terraform repo or one hundred, InfraGuard AI fits your
            existing workflow.
          </p>
        </motion.div>

        {/* Cards grid — 2 + 3 layout */}
        <div className="space-y-4">
          {/* Top row — 2 cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.slice(0, 2).map((uc, i) => (
              <UseCaseCard key={uc.team} uc={uc} index={i} />
            ))}
          </div>
          {/* Bottom row — 3 cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.slice(2).map((uc, i) => (
              <UseCaseCard key={uc.team} uc={uc} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({
  uc,
  index,
}: {
  uc: (typeof useCases)[0];
  index: number;
}) {
  const Icon = iconMap[uc.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group glass rounded-2xl p-6 transition-all duration-300 border-white/[0.06] ${uc.borderHover} ${uc.glowHover} shadow-card hover:shadow-card-hover`}
    >
      {/* Icon + team name */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-xl ${uc.iconBg} transition-transform group-hover:scale-110 duration-200`}>
          <Icon className={`w-5 h-5 ${uc.iconColor}`} />
        </div>
        <h3 className="text-sm font-bold text-slate-200">{uc.team}</h3>
      </div>

      {/* Tagline */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{uc.tagline}</p>

      {/* Benefits */}
      <ul className="space-y-2">
        {uc.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-xs text-slate-500">
            <CheckCircle2 className={`w-3.5 h-3.5 ${uc.iconColor} flex-shrink-0 mt-0.5`} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

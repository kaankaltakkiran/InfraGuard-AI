"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const modes = [
  {
    id: "none",
    name: "Comment Only",
    code: "none",
    icon: MessageSquare,
    description: "InfraGuard AI posts a review comment with all findings but never blocks a merge.",
    whatBlocks: "Nothing — visibility only",
    bestFor: "Starting out or onboarding teams who are new to infrastructure review.",
    iconColor: "text-slate-400",
    iconBg: "bg-slate-500/10",
    accentColor: "slate",
    borderActive: "border-slate-500/40",
    bgActive: "bg-slate-500/5",
    tagColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    badgeColor: "bg-slate-500/10 text-slate-400",
  },
  {
    id: "critical",
    name: "Block Critical",
    code: "critical",
    icon: AlertOctagon,
    description:
      "Merges are blocked only when a critical severity finding is detected. High and below are informational.",
    whatBlocks: "Critical findings only",
    bestFor: "Teams that want a safety net without slowing down routine reviews.",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
    accentColor: "red",
    borderActive: "border-red-500/40",
    bgActive: "bg-red-500/5",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/20",
    badgeColor: "bg-red-500/10 text-red-400",
  },
  {
    id: "high",
    name: "Block High+",
    code: "high",
    icon: AlertTriangle,
    description:
      "Both critical and high severity findings block merges. Medium and low remain advisory.",
    whatBlocks: "Critical + High findings",
    bestFor: "Security-conscious teams who want to catch the most common infrastructure risks.",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    accentColor: "orange",
    borderActive: "border-orange-500/40",
    bgActive: "bg-orange-500/5",
    tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    badgeColor: "bg-orange-500/10 text-orange-400",
  },
  {
    id: "medium",
    name: "Block Medium+",
    code: "medium",
    icon: AlertCircle,
    description:
      "Everything from medium severity and above blocks the merge. Maximum enforcement mode.",
    whatBlocks: "Critical + High + Medium",
    bestFor: "Regulated environments, compliance-driven teams, or mature security programs.",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    accentColor: "amber",
    borderActive: "border-amber-500/40",
    bgActive: "bg-amber-500/5",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    badgeColor: "bg-amber-500/10 text-amber-400",
  },
];

export default function AdoptionSection() {
  const [activeMode, setActiveMode] = useState(0);
  const active = modes[activeMode];

  return (
    <section id="pricing" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            Configurable Enforcement
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            Start with visibility.
            <br />
            <span className="gradient-text">Enforce when ready.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Begin in comment-only mode and ratchet up enforcement as your team builds confidence.
            No disruption. No big-bang adoption.
          </p>
        </motion.div>

        {/* Mode selector + detail */}
        <div className="max-w-4xl mx-auto">
          {/* Mode tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            {modes.map((mode, i) => {
              const Icon = mode.icon;
              const isActive = i === activeMode;
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => setActiveMode(i)}
                  whileHover={{ scale: isActive ? 1 : 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-center ${
                    isActive
                      ? `${mode.borderActive} ${mode.bgActive}`
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeModeBg"
                      className="absolute inset-0 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`relative p-2 rounded-lg ${isActive ? mode.iconBg : "bg-white/5"}`}>
                    <Icon className={`w-4 h-4 ${isActive ? mode.iconColor : "text-slate-500"}`} />
                  </div>
                  <span className={`relative text-xs font-semibold ${isActive ? "text-slate-200" : "text-slate-500"}`}>
                    {mode.name}
                  </span>
                  <code className={`relative text-[10px] font-mono px-1.5 py-0.5 rounded border ${isActive ? mode.tagColor : "bg-white/5 text-slate-600 border-white/[0.06]"}`}>
                    {mode.code}
                  </code>
                </motion.button>
              );
            })}
          </div>

          {/* Mode detail card */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`glass rounded-2xl p-7 border ${active.borderActive}`}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 ${active.iconBg}`}>
                  <active.icon className={`w-4 h-4 ${active.iconColor}`} />
                  <span className={`text-sm font-semibold ${active.iconColor}`}>{active.name}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{active.description}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-slate-500 flex-shrink-0 font-medium">Blocks:</span>
                    <span>{active.whatBlocks}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-slate-500 flex-shrink-0 font-medium">Best for:</span>
                    <span>{active.bestFor}</span>
                  </div>
                </div>
              </div>

              {/* Config preview */}
              <div>
                <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold mb-2.5">
                  workflow config
                </p>
                <div className="bg-navy-900 rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04]">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/40" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono">infraguard.yml</span>
                  </div>
                  <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
                    <span className="text-slate-500">- uses: </span>
                    <span className="text-sky-400">infraguard-ai/action@v1</span>
                    {"\n"}
                    <span className="text-slate-500">  with:</span>
                    {"\n"}
                    <span className="text-slate-500">    block_on: </span>
                    <span className={`font-bold ${active.iconColor}`}>
                      &apos;{active.code}&apos;
                    </span>
                    {"\n"}
                    <span className="text-slate-500">    post_comment: </span>
                    <span className="text-emerald-400">true</span>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progression arrow hint */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {modes.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === activeMode ? "scale-125" : "scale-100"
                  } ${i === 0 ? "bg-slate-500" : i === 1 ? "bg-red-500" : i === 2 ? "bg-orange-500" : "bg-amber-500"}`}
                />
                {i < modes.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-700" />
                )}
              </div>
            ))}
            <span className="ml-3 text-xs text-slate-600">gradually increase enforcement</span>
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <p className="text-sm text-slate-500">
              Change enforcement level anytime with a single config update — no workflow changes needed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Globe,
  Database,
  TrendingUp,
  Terminal,
  AlertCircle,
} from "lucide-react";

const problems = [
  {
    Icon: Lock,
    title: "Hidden IAM Changes",
    description: "A two-line policy change can silently grant overly broad permissions to any AWS resource.",
    color: "red",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]",
  },
  {
    Icon: Globe,
    title: "Public Exposure Risk",
    description: "One misconfigured attribute can expose S3 buckets or RDS instances to the entire internet.",
    color: "red",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]",
  },
  {
    Icon: Database,
    title: "Missing Encryption",
    description: "Databases and storage can be provisioned without encryption enabled by default.",
    color: "amber",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  },
  {
    Icon: TrendingUp,
    title: "Invisible Cost Spikes",
    description: "Resizing a single instance looks minor in a diff but can add thousands per month.",
    color: "amber",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  },
  {
    Icon: Terminal,
    title: "Too Much CI Output",
    description: "6 separate scanner jobs produce hundreds of log lines that reviewers never fully read.",
    color: "slate",
    border: "border-white/10",
    bg: "bg-white/[0.02]",
    iconBg: "bg-white/5",
    iconColor: "text-slate-400",
    glow: "",
  },
  {
    Icon: AlertCircle,
    title: "No Unified Context",
    description: "Security, cost, and style issues live in separate tools with no consolidated view.",
    color: "slate",
    border: "border-white/10",
    bg: "bg-white/[0.02]",
    iconBg: "bg-white/5",
    iconColor: "text-slate-400",
    glow: "",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProblemSection() {
  return (
    <section id="product" className="relative section-padding bg-navy-800/30 overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/20 to-navy-900 pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-red-400 uppercase tracking-widest mb-4 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            Terraform reviews are harder
            <br />
            <span className="text-slate-400">than they look</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A small Terraform diff can change security posture, cloud costs, and availability — but
            raw CI output gives reviewers little signal about what actually matters.
          </p>
        </motion.div>

        {/* Problem grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {problems.map((problem) => (
            <ProblemCard key={problem.title} {...problem} />
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm font-mono">
            The average Terraform PR touches{" "}
            <span className="text-violet-400 font-semibold">6+ resource types</span> and is reviewed
            in under <span className="text-violet-400 font-semibold">4 minutes</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemCard({
  Icon,
  title,
  description,
  border,
  bg,
  iconBg,
  iconColor,
  glow,
}: (typeof problems)[0]) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative rounded-xl border p-5 transition-all duration-300 ${bg} ${border} ${glow} hover:border-opacity-40`}
    >
      <div className={`inline-flex p-2.5 rounded-lg mb-4 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <h3 className="text-sm font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

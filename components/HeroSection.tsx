"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Zap,
  GitPullRequest,
  Bot,
  Clock,
} from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.96 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Animated radial orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <span className="flex items-center gap-2 bg-violet-600/10 border border-violet-500/25 text-violet-300 text-xs font-medium px-3.5 py-1.5 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                Now available in GitHub Actions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
            >
              <span className="text-slate-100">AI-assisted</span>
              <br />
              <span className="gradient-text">Terraform PR</span>
              <br />
              <span className="text-slate-100">reviews</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl lg:max-w-none"
            >
              Catch security risks, cost changes, and Terraform quality issues before
              merge.{" "}
              <span className="text-slate-300">
                InfraGuard AI turns scanner output into one clear Pull Request review comment.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#get-started"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-7 py-3.5 rounded-xl overflow-hidden transition-all"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href="#demo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 font-medium px-7 py-3.5 rounded-xl transition-all hover:bg-white/5"
              >
                <GitPullRequest className="w-4 h-4" />
                View Demo
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 mt-8 justify-center lg:justify-start"
            >
              {[
                { icon: Shield, label: "tfsec + Checkov" },
                { icon: TrendingUp, label: "Infracost" },
                { icon: Code2, label: "tflint + fmt" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Icon className="w-3.5 h-3.5 text-slate-600" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — PR mockup card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <FloatingPRCard />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-slate-600 font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingPRCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      {/* Glow behind the card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur-xl" />

      {/* Main card */}
      <div className="relative glass rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* GitHub-style header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-navy-800/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <GitPullRequest className="w-3.5 h-3.5" />
            acme-corp/infrastructure #247
          </div>
          <div className="w-14" />
        </div>

        {/* Comment body */}
        <div className="p-5 space-y-4">
          {/* Bot header */}
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-violet-600 rounded-full blur-sm opacity-60" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">infraguard-ai</span>
                <span className="text-xs bg-violet-600/20 text-violet-300 border border-violet-500/20 px-1.5 py-0.5 rounded font-medium">
                  bot
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <Clock className="w-3 h-3" />
                2 minutes ago
              </div>
            </div>
          </div>

          {/* Review summary title */}
          <div className="border-l-2 border-violet-500/50 pl-3">
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              🛡️ Terraform Review Summary
            </h3>
            <p className="text-xs text-slate-500 font-mono">feat/new-storage-buckets</p>
          </div>

          {/* Summary chips */}
          <div className="grid grid-cols-3 gap-2">
            <SummaryChip
              color="red"
              label="Security"
              value="2 findings"
              icon={<Shield className="w-3.5 h-3.5" />}
              delay={0.7}
            />
            <SummaryChip
              color="amber"
              label="Cost"
              value="+$184/mo"
              icon={<TrendingUp className="w-3.5 h-3.5" />}
              delay={0.85}
            />
            <SummaryChip
              color="sky"
              label="Style"
              value="3 issues"
              icon={<Code2 className="w-3.5 h-3.5" />}
              delay={1.0}
            />
          </div>

          {/* Finding previews */}
          <div className="space-y-1.5">
            <FindingRow
              severity="high"
              text="Public S3 bucket ACL detected"
              file="modules/storage/main.tf:42"
              delay={1.1}
            />
            <FindingRow
              severity="medium"
              text="Missing server-side encryption"
              file="modules/storage/main.tf:38"
              delay={1.2}
            />
          </div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-xs text-red-300 font-medium">
              Do not merge until high findings are resolved
            </span>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute -right-6 -top-6 glass rounded-xl p-3 shadow-card"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-xs text-slate-300 font-medium">tfsec passed</span>
        </div>
      </motion.div>

      {/* Floating cost badge */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute -left-6 -bottom-6 glass rounded-xl p-3 shadow-card"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-300">+$84/month</p>
            <p className="text-[10px] text-slate-500">cost delta</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SummaryChip({
  color,
  label,
  value,
  icon,
  delay,
}: {
  color: "red" | "amber" | "sky";
  label: string;
  value: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const colorMap = {
    red: "bg-red-500/10 border-red-500/20 text-red-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    sky: "bg-sky-500/10 border-sky-500/20 text-sky-400",
  };
  const labelColorMap = {
    red: "text-slate-400",
    amber: "text-slate-400",
    sky: "text-slate-400",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex flex-col items-center gap-1 rounded-lg border p-2 ${colorMap[color]}`}
    >
      {icon}
      <p className="text-[10px] font-medium leading-none">{value}</p>
      <p className={`text-[9px] ${labelColorMap[color]} opacity-70`}>{label}</p>
    </motion.div>
  );
}

function FindingRow({
  severity,
  text,
  file,
  delay,
}: {
  severity: "high" | "medium";
  text: string;
  file: string;
  delay: number;
}) {
  const severityConfig = {
    high: { dot: "bg-orange-500", label: "HIGH", color: "text-orange-400" },
    medium: { dot: "bg-amber-500", label: "MED", color: "text-amber-400" },
  };
  const cfg = severityConfig[severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-2 text-xs py-1 px-2 rounded-md bg-white/[0.02] border border-white/[0.04]"
    >
      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} flex-shrink-0`} />
      <span className={`font-mono font-semibold text-[10px] ${cfg.color} flex-shrink-0`}>
        {cfg.label}
      </span>
      <span className="text-slate-300 truncate">{text}</span>
      <span className="text-slate-600 font-mono text-[10px] truncate ml-auto hidden sm:block">
        {file}
      </span>
    </motion.div>
  );
}

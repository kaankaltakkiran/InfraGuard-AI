"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  Code2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  DollarSign,
  ArrowUp,
} from "lucide-react";

const lanes = [
  {
    id: "security",
    icon: ShieldAlert,
    title: "Security Review",
    subtitle: "Infrastructure risk analysis",
    tools: ["tfsec", "Checkov"],
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
    accentColor: "emerald",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    hoverGlow: "hover:shadow-glow-emerald",
    tagColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    detects: [
      "Public access configuration",
      "Weak IAM permissions",
      "Missing encryption",
      "Insecure defaults",
      "Exposed cloud resources",
    ],
    mockContent: (
      <SecurityMock />
    ),
  },
  {
    id: "cost",
    icon: DollarSign,
    title: "Cost Review",
    subtitle: "Cloud spend impact analysis",
    tools: ["Infracost"],
    accentFrom: "from-amber-500",
    accentTo: "to-orange-500",
    accentColor: "amber",
    borderColor: "border-amber-500/20",
    bgColor: "bg-amber-500/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    hoverGlow: "hover:shadow-glow-amber",
    tagColor: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    detects: [
      "Monthly cost estimate",
      "PR cost delta",
      "Expensive resource changes",
      "Cost risks before merge",
      "Resource type breakdown",
    ],
    mockContent: (
      <CostMock />
    ),
  },
  {
    id: "style",
    icon: Code2,
    title: "Style & Quality",
    subtitle: "Terraform code quality",
    tools: ["tflint", "terraform fmt"],
    accentFrom: "from-sky-500",
    accentTo: "to-cyan-500",
    accentColor: "sky",
    borderColor: "border-sky-500/20",
    bgColor: "bg-sky-500/5",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    hoverGlow: "hover:shadow-glow-sky",
    tagColor: "bg-sky-500/10 border-sky-500/20 text-sky-400",
    detects: [
      "Formatting inconsistencies",
      "Undescribed variables",
      "Missing output descriptions",
      "Deprecated syntax",
      "Module conventions",
    ],
    mockContent: (
      <StyleMock />
    ),
  },
];

function SecurityMock() {
  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-start gap-2 p-2 rounded-md bg-red-500/10 border border-red-500/20">
        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-300 font-semibold">HIGH</p>
          <p className="text-slate-400">aws-s3-block-public-acls</p>
          <p className="text-slate-600">modules/storage/main.tf:42</p>
        </div>
      </div>
      <div className="flex items-start gap-2 p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 font-semibold">MEDIUM</p>
          <p className="text-slate-400">aws-s3-encryption-customer-key</p>
          <p className="text-slate-600">modules/storage/main.tf:38</p>
        </div>
      </div>
      <div className="flex items-start gap-2 p-2 rounded-md bg-white/[0.03] border border-white/[0.06]">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-emerald-400 font-semibold">PASSED</p>
          <p className="text-slate-500">CKV_AWS_18: S3 access logging</p>
        </div>
      </div>
    </div>
  );
}

function CostMock() {
  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="p-2 rounded-md bg-navy-700/50 border border-white/[0.06]">
        <p className="text-slate-500 mb-2">Monthly cost breakdown</p>
        <div className="space-y-1.5">
          {[
            { resource: "aws_instance.processor", delta: "+$72.00", sign: "up" },
            { resource: "aws_s3_bucket.data_lake", delta: "+$11.50", sign: "up" },
            { resource: "aws_rds_instance.db", delta: "$0.00", sign: "neutral" },
          ].map((row) => (
            <div key={row.resource} className="flex items-center justify-between">
              <span className="text-slate-500 truncate mr-2">{row.resource}</span>
              <span className={row.sign === "up" ? "text-amber-400" : "text-slate-500"}>
                {row.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
        <span className="text-slate-300 font-semibold">PR Delta</span>
        <div className="flex items-center gap-1 text-amber-300 font-semibold">
          <ArrowUp className="w-3 h-3" />
          +$84/month
        </div>
      </div>
    </div>
  );
}

function StyleMock() {
  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-start gap-2 p-2 rounded-md bg-red-500/10 border border-red-500/20">
        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-300 font-semibold">fmt failed</p>
          <p className="text-slate-500">modules/network/main.tf</p>
          <p className="text-slate-600">inconsistent indentation</p>
        </div>
      </div>
      <div className="flex items-start gap-2 p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 font-semibold">Warning</p>
          <p className="text-slate-500">variables.tf:12 — missing description</p>
        </div>
      </div>
      <div className="flex items-start gap-2 p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 font-semibold">Warning</p>
          <p className="text-slate-500">outputs.tf:5 — missing description</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewLanesSection() {
  return (
    <section id="how-it-works" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/50 pointer-events-none" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            Three Review Lanes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
            Every angle, automatically covered
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            InfraGuard AI runs security, cost, and style analysis in parallel — so nothing
            slips through the cracks.
          </p>
        </motion.div>

        {/* Lane cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {lanes.map((lane, i) => (
            <LaneCard key={lane.id} lane={lane} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LaneCard({
  lane,
  index,
}: {
  lane: (typeof lanes)[0];
  index: number;
}) {
  const { icon: Icon } = lane;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${lane.bgColor} ${lane.borderColor} ${lane.hoverGlow} shadow-card hover:shadow-card-hover cursor-default`}
    >
      {/* Gradient top stripe */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${lane.accentFrom} ${lane.accentTo}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + title */}
        <div className="flex items-start gap-4 mb-5">
          <div className={`p-2.5 rounded-xl ${lane.iconBg} flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${lane.iconColor}`} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">{lane.title}</h3>
            <p className="text-xs text-slate-500">{lane.subtitle}</p>
          </div>
        </div>

        {/* Tool badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {lane.tools.map((tool) => (
            <span
              key={tool}
              className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border ${lane.tagColor}`}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Detects list */}
        <div className="mb-5 space-y-1.5">
          {lane.detects.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
              <div className={`w-1 h-1 rounded-full bg-current ${lane.iconColor} flex-shrink-0`} />
              {item}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={`h-px w-full bg-gradient-to-r ${lane.accentFrom} ${lane.accentTo} opacity-20 mb-5`} />

        {/* Mock content */}
        <div className="mt-auto">
          <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold mb-2">
            Sample Output
          </p>
          {lane.mockContent}
        </div>
      </div>
    </motion.div>
  );
}

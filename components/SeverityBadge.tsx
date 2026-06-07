"use client";

import { cn } from "@/lib/utils";
import type { SeverityLevel } from "@/types";

const config: Record<
  SeverityLevel,
  { dot: string; bg: string; border: string; text: string; label: string }
> = {
  critical: {
    dot: "bg-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/25",
    text: "text-red-400",
    label: "Critical",
  },
  high: {
    dot: "bg-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/25",
    text: "text-orange-400",
    label: "High",
  },
  medium: {
    dot: "bg-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    text: "text-amber-400",
    label: "Medium",
  },
  low: {
    dot: "bg-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/25",
    text: "text-sky-400",
    label: "Low",
  },
  info: {
    dot: "bg-slate-500",
    bg: "bg-slate-500/10",
    border: "border-slate-500/25",
    text: "text-slate-400",
    label: "Info",
  },
};

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, { pill: string; dot: string; text: string }> = {
  sm: { pill: "px-1.5 py-0.5 gap-1", dot: "w-1.5 h-1.5", text: "text-[10px]" },
  md: { pill: "px-2 py-0.5 gap-1.5", dot: "w-2 h-2", text: "text-xs" },
  lg: { pill: "px-3 py-1 gap-2", dot: "w-2.5 h-2.5", text: "text-sm" },
};

export default function SeverityBadge({
  level,
  size = "md",
  showLabel = true,
  className,
}: {
  level: SeverityLevel;
  size?: Size;
  showLabel?: boolean;
  className?: string;
}) {
  const cfg = config[level];
  const sz = sizeClasses[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold font-mono",
        cfg.bg,
        cfg.border,
        cfg.text,
        sz.pill,
        sz.text,
        className
      )}
    >
      <span className={cn("rounded-full flex-shrink-0", cfg.dot, sz.dot)} />
      {showLabel && cfg.label}
    </span>
  );
}

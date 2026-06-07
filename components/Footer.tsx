"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Github, Twitter, ExternalLink } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#product" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Pricing", href: "#pricing" },
  ],
  "Use Cases": [
    { label: "Platform Engineering", href: "#use-cases" },
    { label: "Security Teams", href: "#use-cases" },
    { label: "DevOps Teams", href: "#use-cases" },
    { label: "FinOps Teams", href: "#use-cases" },
  ],
  Resources: [
    { label: "Docs", href: "#", external: true },
    { label: "GitHub", href: "#", external: true },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "Contact", href: "#contact" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-navy-900">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-600 rounded-lg blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                <div className="relative bg-gradient-to-br from-violet-500 to-indigo-600 p-1.5 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="font-semibold text-sm">
                <span className="gradient-text">InfraGuard</span>
                <span className="text-slate-300"> AI</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-[200px]">
              AI-assisted Terraform PR reviews for security-conscious teams.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" icon={<Github className="w-4 h-4" />} label="GitHub" />
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {("external" in link && link.external) && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} InfraGuard AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Deterministic tools. AI explanations. Human decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-white/[0.06] hover:border-white/10 transition-all"
    >
      {icon}
    </motion.a>
  );
}

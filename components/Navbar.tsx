"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy-900/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-600 rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-gradient-to-br from-violet-500 to-indigo-600 p-1.5 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="font-semibold text-sm tracking-tight">
                <span className="gradient-text">InfraGuard</span>
                <span className="text-slate-300"> AI</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href} label={link.label} />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                className="text-sm text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5"
              >
                Sign in
              </a>
              <a href="#get-started">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg overflow-hidden transition-shadow hover:shadow-glow-violet"
                >
                  <span className="relative z-10">Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden bg-navy-900/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </motion.a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <a
                  href="#get-started"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium px-4 py-3 rounded-lg hover:shadow-glow-violet transition-shadow"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative group px-3 py-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
    >
      {label}
      <span className="absolute bottom-1 left-3 right-3 h-px bg-gradient-to-r from-violet-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
    </a>
  );
}

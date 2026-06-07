"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-navy-900 to-indigo-900/20" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(124,58,237,0.2) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(124,58,237,0.2) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="relative container-wide">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Card */}
          <div className="relative glass rounded-3xl px-8 py-16 sm:px-16 text-center overflow-hidden max-w-4xl mx-auto">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-transparent to-indigo-600/5 pointer-events-none" />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/25 text-violet-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              No credit card required to start
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6 tracking-tight leading-[1.1]"
            >
              Make Terraform reviews
              <br />
              <span className="gradient-text">faster, safer, and easier</span>
              <br />
              to understand.
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Install in minutes. Works with any GitHub repository using Terraform and GitHub
              Actions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#get-started"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 40px rgba(124, 58, 237, 0.6), 0 0 80px rgba(124, 58, 237, 0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base px-8 py-4 rounded-xl overflow-hidden transition-all"
              >
                <span className="relative z-10">Start Reviewing Pull Requests</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 font-medium text-base px-8 py-4 rounded-xl transition-all hover:bg-white/5"
              >
                <Calendar className="w-4 h-4" />
                Book a Demo
              </motion.a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-10 text-xs text-slate-600"
            >
              {[
                "GitHub Actions native",
                "Terraform 0.12+",
                "No data stored",
                "Free to start",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-violet-500/50" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

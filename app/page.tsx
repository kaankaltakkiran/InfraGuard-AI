"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400 font-mono text-sm">Phase 2 — Navbar &amp; Footer ready</p>
      </div>
      <Footer />
    </main>
  );
}

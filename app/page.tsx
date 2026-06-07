"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}

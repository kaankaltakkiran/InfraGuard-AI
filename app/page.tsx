"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ReviewLanesSection from "@/components/ReviewLanesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ReviewLanesSection />
      <Footer />
    </main>
  );
}

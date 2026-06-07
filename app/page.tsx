"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ReviewLanesSection from "@/components/ReviewLanesSection";
import AIBoundarySection from "@/components/AIBoundarySection";
import WorkflowSteps from "@/components/WorkflowSteps";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ReviewLanesSection />
      <AIBoundarySection />
      <WorkflowSteps />
      <Footer />
    </main>
  );
}

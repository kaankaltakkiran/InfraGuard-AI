"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ReviewLanesSection from "@/components/ReviewLanesSection";
import AIBoundarySection from "@/components/AIBoundarySection";
import WorkflowSteps from "@/components/WorkflowSteps";
import PullRequestCommentMockup from "@/components/PullRequestCommentMockup";
import AdoptionSection from "@/components/AdoptionSection";
import UseCasesSection from "@/components/UseCasesSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900" aria-label="InfraGuard AI landing page">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ReviewLanesSection />
      <AIBoundarySection />
      <WorkflowSteps />
      <PullRequestCommentMockup />
      <AdoptionSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
    </main>
  );
}

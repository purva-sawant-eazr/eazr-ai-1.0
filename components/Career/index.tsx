"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./HeroSection";
import WhyEazrSection from "./WhyEazrSection";
import JobsSection from "./JobsSection";
import CTASection from "./CTASection";

export default function CareerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <WhyEazrSection />
        <JobsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

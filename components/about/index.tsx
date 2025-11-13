"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./HeroSection";
import MissionValues from "./MissionValues";
import TeamSection from "./TeamSection";
import CTASection from "./CTASection";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <MissionValues />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

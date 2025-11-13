"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import MissionValues from "./MissionValues";
import TeamSection from "./TeamSection";
import CTASection from "./CTASection";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AboutHero />
        <MissionValues />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

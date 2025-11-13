"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./HeroSection";
import ContactInfoSection from "./ContactInfoSection";
import ContactFormSection from "./ContactFormSection";
import FAQSection from "./FAQSection";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ContactInfoSection />
        <FAQSection />
        <ContactFormSection />
      </main>
      <Footer />
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import ContactHero from "@/components/Contact/ContactHero";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <Footer />
    </>
  );
};

export default ContactPage;

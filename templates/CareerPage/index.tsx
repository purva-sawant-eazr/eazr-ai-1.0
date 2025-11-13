"use client";

import CareerHero from "@/components/Career/CareerHero";
import CareerValues from "@/components/Career/CareerValues";
import CareerJobs from "@/components/Career/CareerJobs";
import CareerCTA from "@/components/Career/CareerCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const CareerPage = () => {
  return (
    <>
    <Navbar/>
      <CareerHero />
      <CareerValues />
      <CareerJobs />
      <CareerCTA />
      <Footer/>
    </>
  );
};

export default CareerPage;

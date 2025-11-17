"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";
import Button from "../Button";

const CareerHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-light via-white to-brand-light pt-32 pb-24 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-12">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl max-md:w-48 max-md:h-48"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl max-md:w-64 max-md:h-64"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white border border-brand-primary/20 rounded-full px-4 py-2 mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
            <span className="text-sm font-medium text-brand-primary">We're Hiring</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl font-bold leading-tight text-strong-950 mb-6 max-lg:text-5xl max-md:text-4xl max-sm:text-3xl"
          >
            Join the Movement.{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Shape the Future of Credit.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl font-light text-sub-600 mb-8 max-w-3xl mx-auto max-md:text-lg max-sm:text-base"
          >
            Be part of EAZR's mission to make financial access seamless for everyone.
            We're building a smarter, fairer way to pay — and we're looking for bold
            thinkers to help us get there.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              as="link"
              href="#openings"
              className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 flex items-center gap-2"
            >
              See Open Positions
              <ArrowDown className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerHero;

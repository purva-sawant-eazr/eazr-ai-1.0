"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-light via-white to-brand-light pt-32 pb-24 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-12">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl max-md:w-48 max-md:h-48 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl max-md:w-64 max-md:h-64 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-dark/5 rounded-full blur-3xl -z-10"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,134,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(2,134,120,0.03)_1px,transparent_1px)] bg-[size:64px_64px] -z-10" />

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
            className="inline-flex items-center gap-2 bg-white border border-brand-primary/20 rounded-full px-5 py-2.5 mb-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
            <span className="text-sm font-semibold text-brand-primary max-sm:text-xs">Career</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl font-bold leading-tight text-text-primary mb-6 max-lg:text-5xl max-md:text-4xl max-sm:text-3xl"
          >
            Join the Movement.{" "}
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-dark bg-clip-text text-transparent">
              Shape the Future of Credit.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-text-secondary mb-10 max-w-3xl mx-auto max-md:text-lg max-md:mb-8 max-sm:text-base max-sm:mb-6 leading-relaxed"
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
            <Link
              href="#openings"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 max-md:px-6 max-md:py-3 max-sm:px-5 max-sm:py-2.5 rounded-xl font-semibold text-lg max-md:text-base max-sm:text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              See Open Positions
              <ArrowDown className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-light via-white to-brand-light py-24 max-md:py-16 max-sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-brand-primary font-semibold text-sm max-sm:text-xs">
              Eazr in the Spotlight
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-dark bg-clip-text text-transparent">
              Credit Sabke Liye
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg font-semibold text-text-primary mb-6 max-md:mb-4"
          >
            Bridging the Credit Gap Where It Matters Most
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg max-md:text-base max-sm:text-sm text-text-secondary max-w-3xl mx-auto leading-relaxed mb-10 max-md:mb-8"
          >
            Eazr makes credit simple—instant loans, insurance on EMI, and scan & pay using credit.
            Built for working Indians who need access, not complexity.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-4 max-w-4xl mx-auto mt-12 max-md:mt-8"
          >
            {[
              { icon: Users, label: "Users Empowered", value: "10,000+", color: "from-brand-primary to-brand-secondary" },
              { icon: TrendingUp, label: "Credit Disbursed", value: "₹50Cr+", color: "from-brand-secondary to-brand-dark" },
              { icon: Sparkles, label: "Success Rate", value: "95%", color: "from-brand-dark to-brand-primary" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 max-md:p-5 max-sm:p-4 border border-border-light shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6 max-sm:w-5 max-sm:h-5 text-white" />
                </div>
                <p className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm max-sm:text-xs text-text-tertiary font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-brand-secondary/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-dark/5 to-transparent rounded-full blur-3xl -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,134,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(2,134,120,0.03)_1px,transparent_1px)] bg-[size:64px_64px] -z-10" />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 max-md:py-16 max-sm:py-12 bg-gradient-to-br from-[#028678] via-[#00A896] to-[#05665B] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold text-white mb-6 max-md:mb-4 leading-tight"
          >
            Ready to Simplify Your Insurance Payments?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl max-md:text-lg max-sm:text-base text-white/90 max-w-3xl mx-auto mb-10 max-md:mb-8 max-sm:mb-6 leading-relaxed"
          >
            Break down your premiums into easy EMIs with zero hidden costs, instant approval, and flexible repayment options.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-4 mb-10 max-md:mb-8 max-sm:mb-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Zap, label: "Instant Approval", description: "Get approved in minutes" },
              { icon: Shield, label: "Zero Hidden Costs", description: "Complete transparency" },
              { icon: Clock, label: "Flexible EMIs", description: "Pay at your pace" },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-md:p-5 max-sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 max-sm:w-8 max-sm:h-8 text-white mx-auto mb-3 max-md:mb-2" />
                <h3 className="text-white font-bold text-lg max-md:text-base max-sm:text-sm mb-1">
                  {feature.label}
                </h3>
                <p className="text-white/80 text-sm max-sm:text-xs">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/write-copy"
              className="inline-flex items-center gap-3 bg-white text-[#028678] px-10 py-5 max-md:px-8 max-md:py-4 max-sm:px-6 max-sm:py-3 rounded-2xl font-bold text-xl max-md:text-lg max-sm:text-base hover:bg-[#F9FAFB] transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] group"
            >
              Get Started Today
              <ArrowRight className="w-6 h-6 max-sm:w-5 max-sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-md:mt-5 max-sm:mt-4 text-white/70 text-sm max-sm:text-xs"
          >
            Join 10,000+ users who trust Eazr for their financial needs
          </motion.p>
        </motion.div>
      </div>

      {/* Enhanced Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
    </section>
  );
}

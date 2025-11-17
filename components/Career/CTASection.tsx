"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "Instant Approval",
    description: "Get approved in minutes",
  },
  {
    icon: Shield,
    title: "Zero Hidden Costs",
    description: "Complete transparency",
  },
  {
    icon: Clock,
    title: "Flexible EMIs",
    description: "Pay at your pace",
  },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-dark py-24 max-md:py-16 max-sm:py-12">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-md:mb-10 max-sm:mb-8"
        >
          <h2 className="text-5xl font-bold text-white mb-6 max-md:mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl leading-tight">
            Ready to Simplify Your Insurance Payments?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto max-md:text-lg max-sm:text-base leading-relaxed">
            Break down your premiums into easy EMIs with zero hidden costs, instant
            approval, and flexible repayment options.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-5 max-sm:gap-4 mb-12 max-md:mb-10 max-sm:mb-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-sm:p-5 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 max-sm:w-12 max-sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 max-sm:mb-3">
                    <IconComponent className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 max-sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80 max-sm:text-xs">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/write-copy"
            className="inline-flex items-center gap-3 bg-white text-brand-primary px-10 py-5 max-md:px-8 max-md:py-4 max-sm:px-6 max-sm:py-3 rounded-2xl font-bold text-xl max-md:text-lg max-sm:text-base hover:bg-bg-light transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 group"
          >
            Get Started
            <ArrowRight className="w-6 h-6 max-sm:w-5 max-sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 max-md:mt-5 max-sm:mt-4 text-white/70 text-sm max-sm:text-xs"
          >
            Join 10,000+ users who trust Eazr for their financial needs
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

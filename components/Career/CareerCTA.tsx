"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Calendar, ArrowRight } from "lucide-react";
import Button from "../Button";

const features = [
  {
    icon: Zap,
    title: "Instant Approval",
    description: "Quick decisions, no waiting",
  },
  {
    icon: ShieldCheck,
    title: "Zero Hidden Costs",
    description: "Complete transparency",
  },
  {
    icon: Calendar,
    title: "Flexible EMIs",
    description: "Repay on your terms",
  },
];

const CareerCTA = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-brand-primary via-brand-secondary to-brand-dark py-24 max-md:py-16 max-sm:py-12">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-md:mb-10 max-sm:mb-8"
        >
          <h2 className="text-5xl font-bold text-white mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Ready to Simplify Your Insurance Payments?
          </h2>
          <p className="text-xl font-light text-white/90 max-w-3xl mx-auto max-md:text-lg max-sm:text-base">
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
                  <div className="w-14 h-14 max-sm:w-12 max-sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 max-sm:mb-3">
                    <IconComponent className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 max-sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-normal text-white/80 max-sm:text-xs">{feature.description}</p>
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
          <Button
            as="link"
            href="/write-copy"
            isWhite
            className="hover:scale-105 transition-all duration-300 shadow-2xl px-8 inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerCTA;

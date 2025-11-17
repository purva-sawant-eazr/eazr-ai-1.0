"use client";

import { motion } from "framer-motion";
import { Users, Zap, Target, Lightbulb, Heart } from "lucide-react";
import { whyEazrValues } from "./data";

const icons = [Users, Zap, Target, Lightbulb];

export default function WhyEazrSection() {
  return (
    <section className="relative py-24 max-md:py-16 max-sm:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-md:mb-12 max-sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full px-4 py-2 mb-4 border border-brand-primary/20">
            <Heart className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary max-sm:text-xs">Our Culture</span>
          </div>
          <h2 className="text-5xl font-bold text-text-primary mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Why Eazr
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto max-md:text-lg max-sm:text-base leading-relaxed">
            EAZR is Where You Build What Matters — For Millions and For Yourself
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-md:gap-6 max-sm:gap-5">
          {whyEazrValues.map((value, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white border-2 border-border-light rounded-2xl p-8 max-md:p-6 max-sm:p-5 shadow-lg hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 max-sm:w-14 max-sm:h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 max-sm:mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 max-sm:w-7 max-sm:h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-text-primary mb-3 max-sm:mb-2 max-sm:text-lg group-hover:text-brand-primary transition-colors duration-300">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-text-secondary max-sm:text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}

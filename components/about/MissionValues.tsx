"use client";

import { motion } from "framer-motion";
import { Target, Heart, Shield, Sparkles } from "lucide-react";
import { values } from "./data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function MissionValues() {
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
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#028678]/10 rounded-full">
            <Sparkles className="w-4 h-4 text-[#028678]" />
            <span className="text-[#028678] font-semibold text-sm max-sm:text-xs">
              Mission + Values
            </span>
          </div>
          <h2 className="text-4xl max-md:text-3xl max-sm:text-2xl font-bold text-[#0E121B] mb-6 max-md:mb-4">
            Why We Do What We Do
          </h2>
          <p className="text-lg max-md:text-base max-sm:text-sm text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
            Because credit shouldn't show up only when you're already comfortable. In India, credit is everywhere—but only if you already have money, a CIBIL score, a stable job, or the right contacts.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-md:mb-16 max-sm:mb-12"
        >
          <div className="relative bg-gradient-to-br from-[#028678]/5 via-white to-[#00A896]/5 rounded-3xl p-10 max-md:p-8 max-sm:p-6 border border-[#028678]/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#028678]/0 via-[#00A896]/5 to-[#028678]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-start gap-6 max-md:gap-5 max-sm:flex-col">
              <div className="flex-shrink-0 w-20 h-20 max-md:w-16 max-md:h-16 max-sm:w-14 max-sm:h-14 bg-gradient-to-br from-[#028678] to-[#00A896] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10 max-md:w-8 max-md:h-8 max-sm:w-7 max-sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-[#0E121B] mb-5 max-md:mb-4">
                  Our Mission
                </h3>
                <div className="space-y-4 max-md:space-y-3">
                  <p className="text-[#4B5563] text-lg max-md:text-base max-sm:text-sm leading-relaxed">
                    At Eazr, we're here to provide credit where it truly matters—<span className="font-semibold text-[#028678]">healthcare, education, and everyday essentials</span>.
                  </p>
                  <p className="text-[#4B5563] text-lg max-md:text-base max-sm:text-sm leading-relaxed">
                    We step in where traditional finance often steps away—when a family delays insurance, a student's future hangs by a fee, or a small shortfall disrupts daily life. <span className="font-semibold text-[#028678]">Eazr fills that gap—with purpose, not paperwork.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#028678]/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00A896]/10 to-transparent rounded-tr-full" />
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-[#0E121B] mb-10 max-md:mb-8 max-sm:mb-6 text-center">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-md:gap-6 max-sm:gap-4">
            {values.map((value, index) => {
              const icons = [Heart, Shield, Target];
              const colors = [
                { from: "[#028678]", to: "[#00A896]", bg: "[#028678]/10" },
                { from: "[#00A896]", to: "[#05665B]", bg: "[#00A896]/10" },
                { from: "[#05665B]", to: "[#028678]", bg: "[#05665B]/10" },
              ];
              const Icon = icons[index % icons.length];
              const color = colors[index % colors.length];

              return (
                <motion.div
                  key={value.title}
                  variants={item}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative bg-white rounded-2xl p-8 max-md:p-6 max-sm:p-5 border-2 border-[#E5E7EB] hover:border-[#028678]/30 transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${color.from}/0 to-${color.to}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 max-sm:w-14 max-sm:h-14 bg-gradient-to-br from-${color.from} to-${color.to} rounded-xl mb-5 max-md:mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 max-sm:w-7 max-sm:h-7 text-white" />
                    </div>
                    <h4 className="text-xl max-md:text-lg max-sm:text-base font-bold text-[#0E121B] mb-3 max-md:mb-2 group-hover:text-[#028678] transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-[#4B5563] text-base max-md:text-sm max-sm:text-xs leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#028678]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#028678]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00A896]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}

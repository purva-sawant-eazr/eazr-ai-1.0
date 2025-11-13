"use client";

import { motion } from "framer-motion";
import { Users, Zap, Target, Lightbulb, Heart } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Powered by People",
    description:
      "Leveraging the collective skills, creativity, and dedication of individuals to drive innovation and success.",
    gradient: "from-[#028678] to-[#00A896]",
  },
  {
    icon: Zap,
    title: "Inspire and Provoke",
    description:
      "Encouraging new ideas and challenging the status quo to drive growth and transformation.",
    gradient: "from-[#7d52f4] to-[#335cff]",
  },
  {
    icon: Target,
    title: "Driven by Purpose",
    description:
      "We bring together passionate people who believe in making credit simple, fair, and accessible. Every skill, idea, and effort here fuels impact that touches lives at scale.",
    gradient: "from-[#ff8447] to-[#fb3748]",
  },
  {
    icon: Lightbulb,
    title: "Think Bold, Act Smarter",
    description:
      "We challenge norms, question limits, and craft solutions that redefine how finance works. Your ideas here don't just get heard — they get built.",
    gradient: "from-[#1fc16b] to-[#00A896]",
  },
];

const CareerValues = () => {
  return (
    <section className="relative py-24 max-md:py-16 max-sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-md:mb-12 max-sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#028678]/10 to-[#00A896]/10 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 text-[#028678]" />
            <span className="text-sm font-medium text-[#028678]">Our Culture</span>
          </div>
          <h2 className="text-5xl font-bold text-strong-950 mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Why Eazr
          </h2>
          <p className="text-lg font-normal text-sub-600 max-w-3xl mx-auto max-md:text-base">
            EAZR is Where You Build What Matters — For Millions and For Yourself
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-md:gap-6 max-sm:gap-5">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white border border-[#E5E7EB] rounded-2xl p-8 max-md:p-6 max-sm:p-5 shadow-lg hover:shadow-2xl hover:border-[#028678]/30 transition-all duration-300"
              >
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 max-sm:w-14 max-sm:h-14 bg-linear-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 max-sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 max-sm:w-7 max-sm:h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-strong-950 mb-3 max-sm:mb-2 max-sm:text-lg">
                  {value.title}
                </h3>
                <p className="text-base font-normal text-sub-600 max-sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerValues;

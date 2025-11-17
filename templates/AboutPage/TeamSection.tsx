"use client";

import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import TeamCard from "@/components/TeamCard";
import { teamMembers } from "./data";

export default function TeamSection() {
  return (
    <section className="relative py-24 max-md:py-16 max-sm:py-12 bg-gradient-to-b from-bg-light via-brand-light to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-md:mb-12 max-sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-brand-primary/10 rounded-full">
            <Users className="w-4 h-4 text-brand-primary" />
            <span className="text-brand-primary font-semibold text-sm max-sm:text-xs">
              Meet Our Team
            </span>
          </div>

          <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold text-text-primary mb-6 max-md:mb-4">
            Core Team
          </h2>

          <p className="text-2xl max-md:text-xl max-sm:text-lg font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-4">
            The People Behind the Purpose
          </p>

          <p className="text-base max-md:text-sm max-sm:text-xs text-text-secondary max-w-3xl mx-auto leading-relaxed">
            No corporate fluff, no empty titles—just people who care about making credit accessible, insurance simpler, and money less stressful.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:gap-6 max-sm:gap-5">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-md:mt-12 max-sm:mt-8"
        >
          <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-dark rounded-3xl p-10 max-md:p-8 max-sm:p-6 text-center overflow-hidden group">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 max-sm:w-12 max-sm:h-12 bg-white/20 backdrop-blur-sm rounded-2xl mb-5 max-md:mb-4">
                <Sparkles className="w-8 h-8 max-sm:w-6 max-sm:h-6 text-white" />
              </div>

              <h3 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-white mb-4 max-md:mb-3">
                Want to Join Our Team?
              </h3>

              <p className="text-white/90 text-lg max-md:text-base max-sm:text-sm mb-6 max-md:mb-5 max-w-2xl mx-auto">
                We're always looking for passionate individuals who want to make a real difference in financial inclusion.
              </p>

              <a
                href="/carrers"
                className="inline-flex items-center gap-2 px-8 py-4 max-md:px-6 max-md:py-3 max-sm:px-5 max-sm:py-2.5 bg-white text-brand-primary rounded-xl font-semibold text-lg max-md:text-base max-sm:text-sm hover:bg-bg-light hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Open Positions
                <Sparkles className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
              </a>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-dark/3 rounded-full blur-3xl -z-10" />
    </section>
  );
}

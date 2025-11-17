"use client";

import { motion } from "framer-motion";
import { Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { TeamMember } from "@/templates/AboutPage/data";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative bg-white rounded-2xl p-8 max-md:p-6 max-sm:p-5 border-2 border-border-light hover:border-brand-primary/30 transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative">
        {/* Avatar */}
        <div className="w-24 h-24 max-md:w-20 max-md:h-20 max-sm:w-16 max-sm:h-16 rounded-2xl overflow-hidden mb-5 max-md:mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-transparent">
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover bg-transparent"
          />
        </div>

        {/* Name */}
        <h3 className="text-2xl max-md:text-xl max-sm:text-lg font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
          {member.name}
        </h3>

        {/* Role Badge */}
        <div className="inline-flex items-center px-3 py-1.5 bg-brand-primary/10 rounded-lg mb-4 max-md:mb-3">
          <p className="text-brand-primary font-semibold text-sm max-sm:text-xs">
            {member.role}
          </p>
        </div>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-5 max-md:mb-4 text-base max-md:text-sm max-sm:text-xs">
          {member.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent mb-4" />

        {/* Social Link */}
        <a
          href={`https://twitter.com/${member.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-all duration-300 font-medium group/link"
        >
          <div className="p-2 bg-brand-primary/10 rounded-lg group-hover/link:bg-brand-primary/20 transition-colors duration-300">
            <Twitter className="w-4 h-4" />
          </div>
          <span className="text-sm max-sm:text-xs">@{member.handle}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300" />
        </a>
      </div>

      {/* Decorative corner element */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
}

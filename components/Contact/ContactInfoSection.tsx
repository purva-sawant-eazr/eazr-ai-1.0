"use client";

import { motion } from "framer-motion";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { contactInfo } from "./data";

export default function ContactInfoSection() {
  return (
    <section id="contact-info" className="relative py-20 max-md:py-16 max-sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-md:mb-10 max-sm:mb-8"
        >
          <h2 className="text-4xl font-bold text-[#0E121B] mb-4 max-md:text-3xl max-sm:text-2xl">
            Get In Touch
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto max-md:text-base max-sm:text-sm">
            Choose the best way to reach us. We're here to help!
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-5 max-sm:gap-4 mb-16 max-md:mb-12 max-sm:mb-10">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white border-2 border-[#E5E7EB] rounded-2xl p-8 max-md:p-6 max-sm:p-5 shadow-lg hover:shadow-2xl hover:border-[#028678] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon Container with Pulse Effect */}
                <div className="relative">
                  <motion.div
                    className={`w-16 h-16 max-sm:w-14 max-sm:h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mb-5 max-sm:mb-4 group-hover:scale-110 transition-transform duration-300 relative shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 max-sm:w-7 max-sm:h-7 text-white" />

                    {/* Pulse Ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-30`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0E121B] mb-2 max-sm:text-lg group-hover:text-[#028678] transition-colors duration-300">
                  {info.title}
                </h3>
                <p className="text-lg font-semibold text-[#028678] mb-2 max-sm:text-base break-words">
                  {info.details}
                </p>
                <p className="text-sm text-[#6B7280] max-sm:text-xs">
                  {info.subtitle}
                </p>

                {/* Arrow Indicator */}
                <motion.div
                  className="absolute top-6 right-6 max-sm:top-5 max-sm:right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="w-8 h-8 max-sm:w-7 max-sm:h-7 bg-[#028678]/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5 text-[#028678]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.div>

                {/* Decorative corner element */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#028678]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.a>
            );
          })}
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028678]/10 to-[#00A896]/10 rounded-full px-4 py-2 mb-6 border border-[#028678]/20">
            <span className="text-sm font-semibold text-[#028678] max-sm:text-xs">Follow Us</span>
          </div>

          <h3 className="text-3xl font-bold text-[#0E121B] mb-4 max-md:text-2xl max-sm:text-xl">
            Connect With Us on Social Media
          </h3>
          <p className="text-base text-[#4B5563] mb-8 max-w-2xl mx-auto max-sm:text-sm max-sm:mb-6">
            Stay updated with the latest news, features, and insights from EAZR.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 max-sm:gap-3">
            {[
              { icon: Twitter, name: "Twitter", href: "https://twitter.com/eazr", color: "hover:border-[#1DA1F2]", bg: "hover:bg-[#1DA1F2]/5" },
              { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com/company/eazr", color: "hover:border-[#0A66C2]", bg: "hover:bg-[#0A66C2]/5" },
              { icon: Instagram, name: "Instagram", href: "https://instagram.com/eazr", color: "hover:border-[#E4405F]", bg: "hover:bg-[#E4405F]/5" },
            ].map((social, index) => {
              const SocialIcon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -6, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center justify-center w-16 h-16 max-md:w-14 max-md:h-14 max-sm:w-12 max-sm:h-12 bg-white border-2 border-[#E5E7EB] ${social.color} ${social.bg} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                >
                  <SocialIcon className="w-7 h-7 max-md:w-6 max-md:h-6 max-sm:w-5 max-sm:h-5 text-[#4B5563] group-hover:text-[#028678] relative z-10 transition-colors duration-300" />

                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0E121B] text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {social.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0E121B] rotate-45 -mt-1"></div>
                  </div>
                </motion.a>
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

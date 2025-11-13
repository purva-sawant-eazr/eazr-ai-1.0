"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowDown, Sparkles, Send } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F7F6] pt-32 pb-24 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#028678]/10 rounded-full blur-3xl max-md:w-48 max-md:h-48 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00A896]/10 rounded-full blur-3xl max-md:w-64 max-md:h-64 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#05665B]/5 rounded-full blur-3xl -z-10"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,134,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(2,134,120,0.03)_1px,transparent_1px)] bg-[size:64px_64px] -z-10" />

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-40 right-20 max-md:hidden"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[#028678]/20 to-[#00A896]/20 rounded-2xl backdrop-blur-sm shadow-lg"></div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 left-20 max-md:hidden"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#00A896]/20 to-[#05665B]/20 rounded-full backdrop-blur-sm shadow-lg"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-white border border-[#028678]/20 rounded-full px-5 py-2.5 mb-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-[#028678]" />
            <span className="text-sm font-semibold text-[#028678] max-sm:text-xs">Contact Us</span>
            <Sparkles className="w-3.5 h-3.5 text-[#028678] animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl font-bold leading-tight text-[#0E121B] mb-6 max-lg:text-5xl max-md:text-4xl max-sm:text-3xl"
          >
            Let's Start a{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#028678] via-[#00A896] to-[#05665B] bg-clip-text text-transparent">
                Conversation
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#028678] via-[#00A896] to-[#05665B] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-[#4B5563] mb-10 max-w-3xl mx-auto max-md:text-lg max-md:mb-8 max-sm:text-base max-sm:mb-6 leading-relaxed"
          >
            Have questions about EAZR? Want to partner with us? Or just want to say
            hello? We'd love to hear from you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-sm:gap-3 mb-10"
          >
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028678] to-[#00A896] text-white px-8 py-4 max-md:px-6 max-md:py-3 max-sm:px-5 max-sm:py-2.5 rounded-xl font-semibold text-lg max-md:text-base max-sm:text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              <Send className="w-5 h-5 max-sm:w-4 max-sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              Send a Message
            </button>

            <button
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-white text-[#028678] border-2 border-[#028678] px-8 py-4 max-md:px-6 max-md:py-3 max-sm:px-5 max-sm:py-2.5 rounded-xl font-semibold text-lg max-md:text-base max-sm:text-sm hover:bg-[#028678] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
              View Contact Info
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2 text-[#6B7280] cursor-pointer hover:text-[#028678] transition-colors duration-300"
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm font-medium max-sm:text-xs">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

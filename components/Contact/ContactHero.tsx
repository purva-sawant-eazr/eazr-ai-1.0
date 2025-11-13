"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowDown, Sparkles } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#F9FAFB] via-white to-[#F3F7F6] pt-32 pb-20 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#028678]/10 rounded-full blur-3xl animate-pulse max-md:w-48 max-md:h-48"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00A896]/10 rounded-full blur-3xl animate-pulse max-md:w-64 max-md:h-64"></div>

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
        <div className="w-20 h-20 bg-linear-to-br from-[#7d52f4]/20 to-[#335cff]/20 rounded-2xl backdrop-blur-sm"></div>
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
        <div className="w-16 h-16 bg-linear-to-br from-[#ff8447]/20 to-[#fb3748]/20 rounded-full backdrop-blur-sm"></div>
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
            className="inline-flex items-center gap-2 bg-white border border-[#028678]/20 rounded-full px-4 py-2 mb-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-[#028678]" />
            <span className="text-sm font-medium text-[#028678]">Get in Touch</span>
            <Sparkles className="w-3 h-3 text-[#028678] animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl font-bold leading-tight text-strong-950 mb-6 max-lg:text-5xl max-md:text-4xl max-sm:text-3xl"
          >
            Let's Start a{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-[#028678] to-[#00A896] bg-clip-text text-transparent">
                Conversation
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-[#028678] to-[#00A896] rounded-full"
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
            className="text-xl font-light text-sub-600 mb-8 max-w-3xl mx-auto max-md:text-lg max-sm:text-base leading-relaxed"
          >
            Have questions about EAZR? Want to partner with us? Or just want to say
            hello? We'd love to hear from you.
          </motion.p>

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
              className="flex flex-col items-center gap-2 text-sub-600 cursor-pointer hover:text-[#028678] transition-colors duration-300"
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;

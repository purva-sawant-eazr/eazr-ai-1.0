"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HelpCircle, Plus, Minus, Search } from "lucide-react";
import { faqs } from "./data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 max-md:py-16 max-sm:py-12 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-md:mb-10 max-sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full px-4 py-2 mb-4 border border-brand-primary/20">
            <HelpCircle className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary max-sm:text-xs">FAQ</span>
          </div>
          <h2 className="text-5xl font-bold text-text-primary mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto max-md:text-base max-sm:text-sm">
            Find answers to common questions about Eazr and our services.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 max-md:mb-8 max-sm:mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 max-sm:py-3.5 rounded-xl border-2 border-border-light focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 text-base max-sm:text-sm"
            />
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4 max-sm:space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative bg-white border-2 border-border-light rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4 max-sm:top-3 max-sm:right-3">
                  <span className="inline-flex items-center px-3 py-1 max-sm:px-2 max-sm:py-0.5 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary text-xs font-semibold rounded-full">
                    {faq.category}
                  </span>
                </div>

                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 max-md:px-5 max-md:py-4 max-sm:px-4 max-sm:py-3.5 flex items-start justify-between gap-4 hover:bg-bg-light transition-colors duration-300"
                >
                  <span className="text-lg font-bold text-text-primary pr-12 max-md:text-base max-sm:text-sm max-sm:pr-10">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 max-sm:w-7 max-sm:h-7 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center"
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-white" />
                    )}
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 max-md:px-5 max-md:pb-4 max-sm:px-4 max-sm:pb-3.5 border-t border-border-light">
                        <p className="text-base text-text-secondary leading-relaxed pt-5 max-md:pt-4 max-sm:text-sm max-sm:pt-3.5">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 max-sm:py-8"
            >
              <HelpCircle className="w-16 h-16 max-sm:w-12 max-sm:h-12 text-[#E5E7EB] mx-auto mb-4" />
              <p className="text-lg text-text-tertiary max-sm:text-base">
                No FAQs found matching your search.
              </p>
            </motion.div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-md:mt-10 max-sm:mt-8 text-center"
        >
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border border-brand-primary/20 rounded-2xl p-8 max-md:p-6 max-sm:p-5">
            <h3 className="text-2xl font-bold text-text-primary mb-2 max-md:text-xl max-sm:text-lg">
              Still have questions?
            </h3>
            <p className="text-base text-text-secondary mb-6 max-md:mb-5 max-sm:text-sm max-sm:mb-4">
              Can't find the answer you're looking for? Get in touch with our team.
            </p>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-3.5 max-md:px-6 max-md:py-3 max-sm:px-5 max-sm:py-2.5 rounded-xl font-semibold text-base max-sm:text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <HelpCircle className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}

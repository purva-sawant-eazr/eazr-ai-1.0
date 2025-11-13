"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import Button from "../Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Thank you! Your message has been sent successfully.");
    }, 2000);
  };

  return (
    <section className="relative py-24 max-md:py-16 max-sm:py-12 bg-linear-to-br from-[#F9FAFB] via-white to-[#F3F7F6]">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#028678]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12 max-md:mb-10 max-sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-white border border-[#028678]/20 rounded-full px-4 py-2 mb-4 shadow-sm">
              <MessageSquare className="w-4 h-4 text-[#028678]" />
              <span className="text-sm font-medium text-[#028678]">Send us a Message</span>
            </div>
            <h2 className="text-5xl font-bold text-strong-950 mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
              Drop Us a Line
            </h2>
            <p className="text-lg font-normal text-sub-600 max-md:text-base">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 max-md:p-6 max-sm:p-5 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-strong-950 mb-2 max-sm:text-sm"
                >
                  Full Name <span className="text-[#fb3748]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-sub-600" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 max-sm:py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#028678] focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 text-base max-sm:text-sm"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-strong-950 mb-2 max-sm:text-sm"
                >
                  Email Address <span className="text-[#fb3748]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-sub-600" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3 max-sm:py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#028678] focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 text-base max-sm:text-sm"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-base font-medium text-strong-950 mb-2 max-sm:text-sm"
                >
                  Subject <span className="text-[#fb3748]">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 max-sm:py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#028678] focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 text-base max-sm:text-sm"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-base font-medium text-strong-950 mb-2 max-sm:text-sm"
                >
                  Message <span className="text-[#fb3748]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-3 max-sm:py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#028678] focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 resize-none text-base max-sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-[#028678] to-[#00A896] text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;

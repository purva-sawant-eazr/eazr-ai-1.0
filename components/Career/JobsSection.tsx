"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Bell } from "lucide-react";
import JobCard from "./JobCard";
import { jobOpenings } from "./data";

export default function JobsSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement notification signup logic
    console.log("Notify email:", email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section
      id="openings"
      className="relative py-24 max-md:py-16 max-sm:py-12 bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F7F6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-md:mb-12 max-sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028678]/10 to-[#00A896]/10 rounded-full px-4 py-2 mb-4 border border-[#028678]/20">
            <Briefcase className="w-4 h-4 text-[#028678]" />
            <span className="text-sm font-semibold text-[#028678] max-sm:text-xs">Jobs</span>
          </div>
          <h2 className="text-5xl font-bold text-[#0E121B] mb-6 max-md:mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Jobs Opening
          </h2>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto max-md:text-base max-sm:text-sm leading-relaxed">
            Explore our current job openings and find exciting opportunities to join our
            dynamic team. Discover roles that match your skills and passion, and take the
            next step in your career with us.
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:gap-6 max-sm:gap-5 mb-16 max-md:mb-12 max-sm:mb-8">
          {jobOpenings.map((job) => (
            <JobCard key={job.title} {...job} />
          ))}
        </div>

        {/* Notification Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-white to-[#F9FAFB] border-2 border-[#028678]/20 rounded-2xl p-8 max-md:p-6 max-sm:p-5 shadow-xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#028678]/5 rounded-full blur-3xl -z-10"></div>

            <div className="relative text-center mb-6 max-sm:mb-5">
              <div className="inline-flex items-center justify-center w-16 h-16 max-sm:w-14 max-sm:h-14 bg-gradient-to-br from-[#028678] to-[#00A896] rounded-xl mb-4 max-sm:mb-3 shadow-lg">
                <Bell className="w-8 h-8 max-sm:w-7 max-sm:h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#0E121B] mb-2 max-md:text-2xl max-sm:text-xl">
                Don't see opportunity that suits you?
              </h3>
              <p className="text-base text-[#4B5563] max-sm:text-sm">
                Get notified when new roles added
              </p>
            </div>

            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-sm:gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
                className="flex-1 px-5 py-3.5 max-sm:px-4 max-sm:py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#028678] focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 text-base max-sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 max-sm:px-6 max-sm:py-3 bg-gradient-to-r from-[#028678] to-[#00A896] text-white rounded-xl font-semibold text-base max-sm:text-sm hover:shadow-lg transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                {isSubmitting ? "Submitting..." : "Notify Me"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#028678]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00A896]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}

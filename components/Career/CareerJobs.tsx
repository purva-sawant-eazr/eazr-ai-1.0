"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, Bell } from "lucide-react";
import JobCard from "./JobCard";
import Button from "../Button";

const jobOpenings = [
  {
    title: "AI Workflow Specialist",
    type: "Full-time",
    location: "Remote",
    description:
      "Design and optimize AI-driven workflows to enhance credit assessment processes and improve operational efficiency.",
  },
  {
    title: "Backend Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "Build scalable backend systems and APIs that power EAZR's credit platform, ensuring high performance and reliability.",
  },
  {
    title: "Data Analyst",
    type: "Full-time",
    location: "Remote",
    description:
      "Transform complex financial data into actionable insights that drive product decisions and improve user outcomes.",
  },
];

const CareerJobs = () => {
  const [email, setEmail] = useState("");

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement notification signup logic
    console.log("Notify email:", email);
    setEmail("");
  };

  return (
    <section
      id="openings"
      className="relative py-24 max-md:py-16 max-sm:py-12 bg-linear-to-br from-bg-light via-white to-brand-light"
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
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full px-4 py-2 mb-4">
            <Briefcase className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">Open Positions</span>
          </div>
          <h2 className="text-5xl font-bold text-strong-950 mb-4 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
            Jobs Opening
          </h2>
          <p className="text-lg font-normal text-sub-600 max-w-3xl mx-auto max-md:text-base">
            Explore our current job openings and find exciting opportunities to join our
            dynamic team. Discover roles that match your skills and passion, and take the
            next step in your career with us.
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:gap-6 max-sm:gap-5 mb-16 max-md:mb-12 max-sm:mb-8">
          {jobOpenings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <JobCard {...job} />
            </motion.div>
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
          <div className="bg-linear-to-br from-white to-bg-light border border-brand-primary/20 rounded-2xl p-8 max-md:p-6 max-sm:p-5 shadow-xl">
            <div className="text-center mb-6 max-sm:mb-5">
              <div className="inline-flex items-center justify-center w-14 h-14 max-sm:w-12 max-sm:h-12 bg-linear-to-br from-brand-primary to-brand-secondary rounded-xl mb-4 max-sm:mb-3">
                <Bell className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-strong-950 mb-2 max-sm:text-xl">
                Don't see an opportunity that suits you?
              </h3>
              <p className="text-base font-normal text-sub-600 max-sm:text-sm">
                Get notified when new roles are added
              </p>
            </div>

            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-sm:gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3 max-sm:px-4 max-sm:py-2.5 rounded-full border border-border-light focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-[#028678]/20 transition-all duration-300 text-base max-sm:text-sm"
              />
              <Button
                type="submit"
                className="bg-linear-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Notify Me
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerJobs;

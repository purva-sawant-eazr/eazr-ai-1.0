"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";
import Button from "../Button";

interface JobCardProps {
  title: string;
  type: string;
  location: string;
  description?: string;
}

const JobCard = ({ title, type, location, description }: JobCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white border border-border-light rounded-2xl p-6 max-sm:p-5 shadow-lg hover:shadow-2xl hover:border-brand-primary/40 transition-all duration-300"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 max-sm:mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-strong-950 mb-2 max-sm:text-lg group-hover:text-brand-primary transition-colors duration-300">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2 max-sm:gap-1.5">
              <span className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary rounded-full px-3 py-1 text-xs font-medium">
                <Briefcase className="w-3.5 h-3.5" />
                {type}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#7d52f4]/10 text-[#7d52f4] rounded-full px-3 py-1 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Description (if provided) */}
        {description && (
          <p className="text-sm font-normal text-sub-600 mb-6 max-sm:mb-4 flex-1 leading-relaxed">
            {description}
          </p>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-border-light">
          <Button
            as="link"
            href="#apply"
            className="w-full bg-linear-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;

"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Share2, Globe } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support@eazr.in",
    subtitle: "We'll respond within 24 hours",
    gradient: "from-brand-primary to-brand-secondary",
    link: "mailto:support@eazr.in",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 (800) 123-4567",
    subtitle: "Mon-Fri, 9AM to 6PM IST",
    gradient: "from-[#7d52f4] to-[#335cff]",
    link: "tel:+918001234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Mumbai, India",
    subtitle: "Headquarters",
    gradient: "from-[#ff8447] to-[#fb3748]",
    link: "#",
  },
];

const socialLinks = [
  {
    icon: Globe,
    name: "Twitter",
    href: "https://twitter.com/eazr",
    color: "text-[#1DA1F2]",
  },
  {
    icon: Share2,
    name: "LinkedIn",
    href: "https://linkedin.com/company/eazr",
    color: "text-[#0A66C2]",
  },
  {
    icon: Mail,
    name: "Newsletter",
    href: "#newsletter",
    color: "text-[#E4405F]",
  },
];

const ContactInfo = () => {
  return (
    <section id="contact-info" className="relative py-16 max-md:py-12 max-sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-5 mb-16 max-md:mb-12 max-sm:mb-10">
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
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white border-2 border-border-light rounded-2xl p-6 max-sm:p-5 shadow-lg hover:shadow-2xl hover:border-brand-primary transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon Container with Pulse Effect */}
                <div className="relative">
                  <motion.div
                    className={`w-14 h-14 max-sm:w-12 max-sm:h-12 bg-linear-to-br ${info.gradient} rounded-xl flex items-center justify-center mb-4 max-sm:mb-3 group-hover:scale-110 transition-transform duration-300 relative`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white" />

                    {/* Pulse Ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl bg-linear-to-br ${info.gradient} opacity-0 group-hover:opacity-30`}
                      animate={{
                        scale: [1, 1.2, 1],
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
                <h3 className="text-lg font-bold text-strong-950 mb-2 max-sm:text-base group-hover:text-brand-primary transition-colors duration-300">
                  {info.title}
                </h3>
                <p className="text-xl font-semibold text-brand-primary mb-1 max-sm:text-lg wrap-break-word">
                  {info.details}
                </p>
                <p className="text-sm font-normal text-sub-600 max-sm:text-xs">
                  {info.subtitle}
                </p>

                {/* Arrow Indicator */}
                <motion.div
                  className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.div>
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
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full px-4 py-2 mb-6">
            <Clock className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">Follow Us</span>
          </div>

          <h3 className="text-3xl font-bold text-strong-950 mb-4 max-md:text-2xl max-sm:text-xl">
            Connect With Us on Social Media
          </h3>
          <p className="text-base font-normal text-sub-600 mb-8 max-w-2xl mx-auto max-sm:text-sm">
            Stay updated with the latest news, features, and insights from EAZR.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 max-sm:gap-3">
            {socialLinks.map((social, index) => {
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
                  className="group flex items-center justify-center w-14 h-14 max-sm:w-12 max-sm:h-12 bg-white border-2 border-border-light rounded-xl hover:border-brand-primary shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <SocialIcon className={`w-6 h-6 max-sm:w-5 max-sm:h-5 ${social.color} relative z-10 transition-transform duration-300 group-hover:scale-110`} />

                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-strong-950 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {social.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-strong-950 rotate-45 -mt-1"></div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;

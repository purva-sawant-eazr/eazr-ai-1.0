// "use client";
// import Link from "next/link";
// import {
//   Github,
//   Twitter,
//   Linkedin,
//   Mail,
//   // Sparkles,
//   Zap,
//   Shield,
//   Heart,
//   ArrowUpRight,
//   MessageCircle,
// } from "lucide-react";
// import Image from "next/image";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative w-full border-t border-[#E5E7EB] bg-gradient-to-b from-white via-[#F9FAFB] to-[#F3F7F6] mt-20 overflow-hidden">
//      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 

//         {/* Bottom Section */}
//         <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-6">
//           {/* Copyright */}
//           <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-[#6B7280]">
//             <p className="flex items-center gap-2 font-medium">
//               © {currentYear}{" "}
//               <span className="text-[#028678] font-semibold">Eazr AI</span>
//               <span className="hidden sm:inline">•</span>
//               <span className="hidden sm:inline">All rights reserved</span>
//             </p>
//             <span className="hidden md:inline text-[#E5E7EB]">•</span>
//             <p className="flex items-center gap-2">
//               Made with
//               <Heart className="w-4 h-4 text-[#028678] fill-[#028678] animate-pulse" />
//               <span className="font-medium">by developers, for developers</span>
//             </p>
//           </div>

//           {/* Social Links */}
//           <div className="flex items-center gap-3">
//             {[
//               {
//                 href: "https://twitter.com",
//                 icon: Twitter,
//                 label: "Twitter",
//                 gradient: "from-[#028678] to-[#00A896]",
//               },
//               {
//                 href: "https://github.com",
//                 icon: Github,
//                 label: "GitHub",
//                 gradient: "from-[#00A896] to-[#05665B]",
//               },
//               {
//                 href: "https://linkedin.com",
//                 icon: Linkedin,
//                 label: "LinkedIn",
//                 gradient: "from-[#05665B] to-[#028678]",
//               },
//               {
//                 href: "mailto:hello@eazr.ai",
//                 icon: Mail,
//                 label: "Email",
//                 gradient: "from-[#028678] to-[#00A896]",
//               },
//             ].map((social, index) => (
//               <Link
//                 key={index}
//                 href={social.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={social.label}
//                 className="group relative p-3 rounded-xl border-2 border-[#E5E7EB] text-[#6B7280] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
//               >
//                 {/* Gradient Background on Hover */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
//                 ></div>

//                 {/* Icon */}
//                 <social.icon className="relative w-5 h-5 group-hover:text-[#028678] transition-colors duration-300" />

//                 {/* Tooltip */}
//                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#0E121B] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
//                   {social.label}
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0E121B]"></span>
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

   {/* Background Decorations */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#028678]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00A896]/5 rounded-full blur-3xl"></div>
      </div> */}

       
        {/* <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="relative">
               
                <div className="absolute inset-0 bg-gradient-to-r from-[#028678] to-[#00A896] rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative size-12 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#028678]/10 to-[#00A896]/10 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/logo/eazr_logo.png"
                    alt="Eazr AI Logo"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

             
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#028678] to-[#00A896] bg-clip-text text-transparent group-hover:from-[#00A896] group-hover:to-[#05665B] transition-all duration-300">
                  Eazr AI
                </span>
                <span className="text-sm text-[#6B7280] font-medium -mt-0.5">
                  Build with AI
                </span>
              </div>
            </Link>

            <p className="text-[#6B7280] text-sm leading-relaxed mb-6 max-w-sm">
              Empowering developers to build incredible web applications with
              the power of AI. Fast, reliable, and innovative solutions for the
              modern web.
            </p>
          </div>

         
          <div className="hidden lg:block lg:col-span-2"></div>

       
          <div className="lg:col-span-3">
            <h3 className="text-[#0E121B] font-bold text-base mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#028678] to-[#00A896] rounded-full"></div>
              Company
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/career", label: "Careers" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B7280] hover:text-[#028678] transition-all duration-200 text-sm flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-0 h-px bg-[#028678] group-hover:w-3 transition-all duration-200"></span>
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          <div className="lg:col-span-3">
            <h3 className="text-[#0E121B] font-bold text-base mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#00A896] to-[#05665B] rounded-full"></div>
              Legal
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/security", label: "Security" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B7280] hover:text-[#028678] transition-all duration-200 text-sm flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-0 h-px bg-[#028678] group-hover:w-3 transition-all duration-200"></span>
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#028678]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div> */}


        import Link from "next/link";
import { Heart, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-[#E5E7EB] bg-gradient-to-b from-white via-[#F9FAFB] to-[#F3F7F6] mt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#028678]/10 to-[#00A896]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#00A896]/10 to-[#028678]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Section */}
        <div className="py-10 flex flex-col justify-center items-center gap-6">
          {/* Copyright - Centered */}
          <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-[#6B7280]">
            <p className="flex items-center gap-2 font-medium">
              © {currentYear}{" "}
              <span className="text-[#028678] font-semibold">Eazr AI</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">All rights reserved</span>
            </p>
            <span className="hidden md:inline text-[#E5E7EB]">•</span>
            <p className="flex items-center gap-2">
              Made with
              <Heart className="w-4 h-4 text-[#028678] fill-[#028678] animate-pulse" />
              <span className="font-medium">by developers, for better insurance experiences</span>
            </p>
          </div>

          {/* Social Links - Below Copyright */}
          <div className="flex items-center gap-3">
            {[
              {
                href: "https://www.instagram.com/eazrlife/",
                icon: Instagram,
                label: "Instagram",
                gradient: "from-[#00A896] to-[#05665B]",
              },
              {
                href: "https://www.linkedin.com/company/eazr",
                icon: Linkedin,
                label: "LinkedIn",
                gradient: "from-[#05665B] to-[#028678]",
              },
              {
                href: "mailto:hello@eazr.ai",
                icon: Mail,
                label: "Email",
                gradient: "from-[#028678] to-[#00A896]",
              },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative p-3 rounded-xl border-2 border-[#E5E7EB] text-[#6B7280] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <social.icon className="relative w-5 h-5 group-hover:text-[#028678] transition-colors duration-300" />

                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#0E121B] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                  {social.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0E121B]"></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";
import React from "react";

type Props = {
  isFast?: boolean;
};

const Loader = ({ }: Props) => {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {/* Animated Text */}
      <h6 className="text-brand-primary font-semibold text-sm tracking-wide animate-slide">
    ...
      </h6>
 
      {/* Custom keyframes (Tailwind doesn’t have this built in) */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(8px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;

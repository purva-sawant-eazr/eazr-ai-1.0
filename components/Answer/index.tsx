"use client";
import Image from "@/components/Image";
import React from "react";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const Answer = ({ children, isLoading = false }: Props) => (
  <div className="flex items-start mb-6">
    {/* Avatar Left */}
    <div className="shrink-0 flex items-center justify-cente">
      <div
        className={`size-9  ${isLoading ? "animate-spin" : ""}`}
        style={isLoading ? { animationDuration: "3s" } : {}}
      >
        <Image
          className="size-9 object-contain"
          src="/images/logo/eazr_logo.png"
          width={36}
          height={36}
          alt="Eazr AI Avatar"
        />
      </div>
    </div>

    {/* Message Content */}
    <div className="ml-3 max-w-[80%] bg-white text-text-primary border border-brand-secondary/40 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="mb-1 text-label-sm font-semibold text-brand-primary">
      Eazr AI
      </div>
      <div className="text-label-sm leading-[1.6]">{children}</div>
    </div>
  </div>
);

export default Answer;

"use client";

import { useState } from "react";
import Image from "@/components/Image";
import { Switch as HeadlessSwitch } from "@headlessui/react";

const Speed = () => {
  const [checked, setChecked] = useState(false);

  return (
    <HeadlessSwitch
      className={`relative group inline-flex w-16 h-6 p-0.75 rounded-full overflow-hidden border transition-all duration-300 ${
        checked
          ? "bg-gradient-to-r from-brand-secondary to-brand-primary border-brand-secondary/60 shadow-[0_0_10px_#00A89655]"
          : "bg-[#E7FBF4] border-brand-secondary/20"
      }`}
      checked={checked}
      onChange={setChecked}
    >
      <Image
        className="absolute top-0 left-0 w-full opacity-20"
        src="/images/bg-toggle.png"
        width={64}
        height={24}
        alt="Speed"
      />

      <span
        className={`relative z-10 flex items-center justify-center w-12 h-4.5 rounded-full text-p-xs font-semibold transition-all duration-300 ${
          checked
            ? "bg-white/20 text-white translate-x-2.5"
            : "bg-white text-brand-primary"
        }`}
      >
        Speed
      </span>
    </HeadlessSwitch>
  );
};

export default Speed;

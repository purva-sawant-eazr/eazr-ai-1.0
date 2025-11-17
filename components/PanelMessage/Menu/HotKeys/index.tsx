"use client";
import Image from "@/components/Image";

const HotKeys = () => (
  <div className="flex items-center gap-4 py-3.5 px-4 border-b border-brand-secondary/30 text-brand-dark text-sm font-medium bg-gradient-to-r from-bg-light to-[#F3F4F6] rounded-t-2xl max-md:hidden">
    {/* Navigate */}
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary blur-sm opacity-30 rounded-md"></div>
        <Image
          className="w-5 relative z-10"
          src="/images/key-square-arrow-down.svg"
          width={20}
          height={20}
          alt="Down Arrow Key"
        />
      </div>
      <div className="rotate-180 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary blur-sm opacity-30 rounded-md"></div>
        <Image
          className="w-5 relative z-10"
          src="/images/key-square-arrow-down.svg"
          width={20}
          height={20}
          alt="Up Arrow Key"
        />
      </div>
      <span className="text-brand-primary font-semibold">
        To Navigate
      </span>
    </div>

    {/* Select */}
    <div className="flex items-center gap-1.5 mr-auto">
      <div className="rotate-180 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary blur-sm opacity-30 rounded-md"></div>
        <Image
          className="w-5 relative z-10"
          src="/images/key-square-enter.svg"
          width={20}
          height={20}
          alt="Enter Key"
        />
      </div>
      <span className="text-brand-primary font-semibold">To Select</span>
    </div>

    {/* Close */}
    <div className="flex items-center gap-1.5">
      <div className="rotate-180 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary blur-sm opacity-30 rounded-md"></div>
        <Image
          className="w-5 relative z-10"
          src="/images/key-square-enter.svg"
          width={20}
          height={20}
          alt="Close Key"
        />
      </div>
      <span className="text-brand-primary font-semibold">To Close</span>
    </div>
  </div>
);

export default HotKeys;

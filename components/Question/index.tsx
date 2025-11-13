"use client";

import Image from "@/components/Image";

type Props = {
  children: React.ReactNode;
};

const Question = ({ children }: Props) => (
  <div className="flex items-start justify-end mb-6">
    {/* Message Content */}
    <div className="mr-3 max-w-[80%] bg-gradient-to-r from-[#028678] to-[#00A896] text-white rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-label-sm font-semibold">James Brown</div>
        <div className="-mb-0.5 text-p-xs opacity-80">1 min ago</div>
      </div>
      <div className="text-label-sm leading-[1.6]">{children}</div>
    </div>

    {/* Avatar Right */}
    <div className="shrink-0">
      <Image
        className="size-9 rounded-full object-cover ring-2 ring-[#00A896] ring-offset-2 ring-offset-white"
        src="/images/avatar-2.png"
        width={36}
        height={36}
        alt="Avatar"
      />
    </div>
  </div>
);

export default Question;

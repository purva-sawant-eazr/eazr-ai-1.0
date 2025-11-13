"use client";
import { Paperclip, Globe } from "lucide-react";

type ActionButtonProps = {
  type: "attach" | "public";
  label: string;
};

const ActionButton = ({ type, label }: ActionButtonProps) => {
  const Icon = type === "attach" ? Paperclip : Globe;

  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00A896]/30 bg-gradient-to-r from-[#00A896]/15 to-[#028678]/15 text-[#028678] text-sm font-medium hover:from-[#00A896]/30 hover:to-[#028678]/30 hover:border-[#028678]/50 hover:text-[#05665B] transition-all duration-200">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;

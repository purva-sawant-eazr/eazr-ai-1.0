"use client";
import { ArrowUpCircle } from "lucide-react";

const SendButton = () => {
  return (
    <button
      className="ml-auto size-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-300 transition"
      aria-label="Send"
    >
      <ArrowUpCircle className="w-5 h-5 text-gray-800" />
    </button>
  );
};

export default SendButton;

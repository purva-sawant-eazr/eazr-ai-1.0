"use client";
import { QrCode } from "lucide-react";

const QRCodeCard = () => {
  return (
    <div className="flex items-center gap-3 bg-[#1E1E1E] text-white px-5 py-3 rounded-xl border border-stroke-soft-200 hover:border-blue-400 transition shadow-sm">
      <div className="flex items-center justify-center size-12 bg-[#2A2A2A] rounded-lg">
        <QrCode className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex flex-col">
        <span className="font-medium">Scan to Continue</span>
        <span className="text-sub-600 text-sm">
          Use QR to verify access
        </span>
      </div>
    </div>
  );
};

export default QRCodeCard;

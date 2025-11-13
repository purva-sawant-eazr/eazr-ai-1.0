"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const Note = () => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="flex items-center gap-1.5 min-h-8 px-3 py-1.5 rounded-t-xl border-b border-[#00A896]/30 bg-gradient-to-r from-[#E0FAEC] to-[#D0FBE9] text-label-xs text-[#028678] shadow-sm">
      {/* Alert Icon */}
      <div className="shrink-0 text-0">
        <Icon
          className="!size-4 fill-[#00A896]"
          name="alert-circle"
        />
      </div>

      {/* Message */}
      <div className="grow font-medium text-[#05665B]">
        By selecting a feature, it will help you reach your goal more
        easily.
      </div>

      {/* Close Button */}
      <button
        className="group transition-all duration-200"
        onClick={() => setIsVisible(false)}
      >
        <Icon
          className="!size-4 fill-[#05665B] group-hover:fill-[#FB3748] transition-colors duration-200"
          name="close"
        />
      </button>
    </div>
  ) : null;
};

export default Note;

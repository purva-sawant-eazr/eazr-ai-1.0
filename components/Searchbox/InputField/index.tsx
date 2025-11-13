"use client";

import React from "react";

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const InputField = ({
  placeholder,
  value,
  onChange,
  onKeyPress,
}: InputFieldProps) => {
  return (
    <div className="flex items-start gap-3 p-5">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        rows={3}
        className="flex-1 bg-transparent outline-none text-[#0E121B] placeholder:text-[#9CA3AF] 
                   text-base sm:text-lg leading-relaxed font-normal resize-none 
                   min-h-[80px] max-h-[200px]"
      />
    </div>
  );
};

export default InputField;

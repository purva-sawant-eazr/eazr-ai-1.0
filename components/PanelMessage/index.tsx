// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import TextareaAutosize from "react-textarea-autosize";
// import Icon from "@/components/Icon";
// import Image from "@/components/Image";
// import Note from "./Note";
// import Speed from "./Speed";
// import Search from "./Search";
// import Menu from "./Menu";

// type ButtonProps = {
//   className?: string;
//   icon: string;
//   onClick: () => void;
// };

// const Button = ({ className, icon, onClick }: ButtonProps) => {
//   return (
//     <button
//       className={`group text-0 ${className || ""}`}
//       onClick={onClick}
//     >
//       <Icon
//         className="fill-text-tertiary transition-colors group-hover:fill-brand-secondary"
//         name={icon}
//       />
//     </button>
//   );
// };

// type Props = {
//   onSend?: (message: string) => void;
// };

// const PanelMessage = ({ onSend }: Props) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     if (message.trim() && onSend) {
//       onSend(message);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="relative z-3 mx-7.5 mb-5.5 shrink-0 rounded-xl border border-brand-secondary/30 bg-gradient-to-br from-white to-[#E7FBF4]/50 shadow-[0_0_15px_rgba(0,168,150,0.08)] max-md:m-0 transition-all duration-300"
//     >
//       <Note />
//       <div className="px-3 py-3.5 max-md:px-4 max-md:py-2.5">
//         {/* Textarea */}
//         <div className="min-h-12 text-0 mb-3">
//           <TextareaAutosize
//             className="w-full h-12 text-p-md text-text-primary outline-none resize-none placeholder:text-text-disabled"
//             maxRows={5}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Write your message ..."
//           />
//         </div>

//         {/* Toolbar */}
//         <div className="flex items-center gap-2.5">
//           <Speed />
//           <div className="w-0.25 h-5 bg-brand-secondary/20"></div>
//           <Menu />
//           <Button icon="link" onClick={() => {}} />
//           <Search />
//           <Button icon="image" onClick={() => {}} />
//           <Link className="group text-0" href="/research">
//             <Icon
//               className="fill-text-tertiary transition-colors group-hover:fill-brand-secondary"
//               name="voice"
//             />
//           </Link>
//           <div className="w-0.25 h-5 bg-brand-secondary/20"></div>

//           {/* Send Button */}
//           <button
//             type="submit"
//             className={`group text-0 transition-all duration-200 ${
//               !message.trim()
//                 ? "opacity-50 cursor-not-allowed"
//                 : "opacity-100 hover:scale-110"
//             }`}
//             disabled={!message.trim()}
//             onClick={handleSubmit}
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
//               <Image
//                 className="w-5 relative z-10"
//                 src="/images/sent.svg"
//                 width={20}
//                 height={20}
//                 alt="Sent"
//               />
//             </div>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PanelMessage;


"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Note from "./Note";
import Speed from "./Speed";
import Search from "./Search";
import Menu from "./Menu";

type ButtonProps = {
  className?: string;
  icon: string;
  onClick: () => void;
};

const Button = ({ className, icon, onClick }: ButtonProps) => {
  return (
    <button className={`group text-0 ${className || ""}`} onClick={onClick}>
      <Icon
        className="fill-text-tertiary transition-colors group-hover:fill-brand-secondary"
        name={icon}
      />
    </button>
  );
};

type Props = {
  onSend?: (message: string, files?: File[]) => void;
  isLoading?: boolean;
};

const PanelMessage = ({ onSend, isLoading = false }: Props) => {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setUploadedFiles((prev) => [...prev, ...fileArray]);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove file from upload list
  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Trigger file input click
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Only emit message to parent — don't call API directly
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!message.trim() && uploadedFiles.length === 0) || !onSend || isLoading) return;

    const userMessage = message.trim();
    const files = uploadedFiles.length > 0 ? uploadedFiles : undefined;

    setMessage("");
    setUploadedFiles([]);

    // Send message and files up to WriteCopyPage (which will handle the API call)
    onSend(userMessage, files);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-3 mx-7.5 mb-5.5 shrink-0 rounded-xl border border-brand-secondary/30 bg-gradient-to-br from-white to-[#E7FBF4]/50 shadow-[0_0_15px_rgba(0,168,150,0.08)] max-md:m-0 transition-all duration-300"
    >
      {/* <Note /> */}
      <div className="px-3 py-3.5 max-md:px-4 max-md:py-2.5">
        {/* File Previews */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="relative group bg-gray-100 rounded-lg p-2 flex items-center gap-2 border border-gray-200"
              >
                {/* File icon or image preview */}
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Icon className="fill-gray-500" name="document" />
                  </div>
                )}

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate max-w-[150px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-white text-xs font-bold">×</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <div className="min-h-5 text-0 mb-3">
          <TextareaAutosize
            className="w-full h-12 text-p-md text-text-primary outline-none resize-none placeholder:text-text-disabled"
            maxRows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              isLoading ? "Eazr AI is thinking..." : "Write your message..."
            }
            disabled={isLoading}
          />
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Left side icons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleImageButtonClick}
              className="group text-0"
              title="Add image or photo"
            >
              <Icon
                className="fill-text-tertiary transition-colors group-hover:fill-brand-secondary"
                name="image"
              />
            </button>
            {/* <Link className="group text-0" href="/research">
              <Icon
                className="fill-text-tertiary transition-colors group-hover:fill-brand-secondary"
                name="voice"
              />
            </Link> */}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className={`group text-0 transition-all duration-200 ${
              (!message.trim() && uploadedFiles.length === 0) || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:scale-110"
            }`}
            disabled={(!message.trim() && uploadedFiles.length === 0) || isLoading}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <Image
                className="w-5 relative z-10"
                src="/images/sent.svg"
                width={20}
                height={20}
                alt="Sent"
              />
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PanelMessage;

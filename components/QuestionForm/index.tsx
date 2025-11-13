"use client";
import React, { useState } from "react";

type ProgressInfo = {
  current: number;
  total: number;
  percentage: number;
};

type ExitOption = {
  title: string;
  action: string;
};

type QuestionFormProps = {
  message: string;
  title?: string;
  options?: string[];
  input_type?: string;
  required?: boolean;
  question_number?: number;
  total_questions?: number;
  progress?: ProgressInfo;
  exit_option?: ExitOption;
  input_hint?: string;
  disabled?: boolean;
  onSubmit: (answer: string) => void;
  onExit?: () => void;
};

const QuestionForm = ({
  message,
  title,
  options = [],
  input_type = "text",
  required = true,
  question_number,
  total_questions,
  progress,
  exit_option,
  input_hint,
  disabled = false,
  onSubmit,
  onExit,
}: QuestionFormProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [textAnswer, setTextAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    const answer = input_type === "dropdown" ? selectedAnswer : textAnswer;

    if (required && !answer.trim()) {
      alert("Please provide an answer before continuing");
      return;
    }

    onSubmit(answer);
    // Reset form
    setSelectedAnswer("");
    setTextAnswer("");
  };

  const handleOptionClick = (option: string) => {
    if (disabled) return;

    setSelectedAnswer(option);
    // Auto-submit when option is selected
    onSubmit(option);
  };

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-[#028678] to-[#00A896] p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {question_number && total_questions && (
              <p className="text-sm text-white/90 mt-1">
                Question {question_number} of {total_questions}
              </p>
            )}
          </div>
          <button
            onClick={onExit}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
          >
            {exit_option?.title || "Exit"}
          </button>
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-white/90 mb-1">
              <span>Progress</span>
              <span>{progress.percentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Question Content */}
      <div className="p-6">
        <p className="text-base font-medium text-gray-900 mb-4">
          {message}
          {required && <span className="text-red-500 ml-1">*</span>}
        </p>

        {/* Dropdown/Multiple Choice Options */}
        {input_type === "dropdown" && options.length > 0 && (
          <div className="space-y-2">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={disabled}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                    : selectedAnswer === option
                    ? "border-[#028678] bg-[#028678]/5 text-[#028678] font-medium"
                    : "border-gray-200 hover:border-[#028678]/50 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{option}</span>
                  {selectedAnswer === option && (
                    <svg
                      className="w-5 h-5 text-[#028678]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Text Input */}
        {input_type === "text" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder={input_hint || "Type your answer here..."}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                  disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 focus:border-[#028678] focus:ring-2 focus:ring-[#028678]/20"
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={disabled}
              className={`w-full px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                disabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#028678] to-[#00A896] text-white hover:shadow-lg"
              }`}
            >
              Submit Answer
            </button>
          </form>
        )}

        {/* Number Input */}
        {input_type === "number" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="number"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder={input_hint || "Enter a number..."}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                  disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 focus:border-[#028678] focus:ring-2 focus:ring-[#028678]/20"
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={disabled}
              className={`w-full px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                disabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#028678] to-[#00A896] text-white hover:shadow-lg"
              }`}
            >
              Submit Answer
            </button>
          </form>
        )}

        {/* Date Input */}
        {input_type === "date" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="date"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all ${
                  disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 focus:border-[#028678] focus:ring-2 focus:ring-[#028678]/20"
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={disabled}
              className={`w-full px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                disabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#028678] to-[#00A896] text-white hover:shadow-lg"
              }`}
            >
              Submit Answer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;

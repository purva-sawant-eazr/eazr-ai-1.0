"use client";
import React, { useState } from "react";

type EditableField = {
  question_number: number;
  question: string;
  current_answer: string;
  field_type: string;
  field_key: string;
  options?: string[] | null;
  required: boolean;
};

type NextAction = {
  title: string;
  action: string;
  policy_id?: string;
  application_id?: string;
};

type BackAction = {
  title: string;
  action: string;
  policy_id?: string;
};

type ReviewSubmitProps = {
  title?: string;
  subtitle?: string;
  editable_fields?: EditableField[];
  next_action?: NextAction | null;
  back_action?: BackAction | null;
  onSubmit: (editedFields: Record<string, string>, action: string, actionData?: any) => void;
  onCancel?: (action: string, actionData?: any) => void;
};

const ReviewSubmit = ({
  title = "Review and Submit",
  subtitle,
  editable_fields = [],
  next_action = null,
  back_action = null,
  onSubmit,
  onCancel,
}: ReviewSubmitProps) => {
  const [editedAnswers, setEditedAnswers] = useState<Record<string, string>>({});
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);

  const handleEditClick = (fieldKey: string, currentAnswer: string) => {
    setEditingFieldKey(fieldKey);
    // Initialize edited answer with current value if not already edited
    if (!editedAnswers[fieldKey]) {
      setEditedAnswers({
        ...editedAnswers,
        [fieldKey]: currentAnswer,
      });
    }
  };

  const handleSaveEdit = (fieldKey: string) => {
    setEditingFieldKey(null);
  };

  const handleCancelEdit = (fieldKey: string, originalAnswer: string) => {
    setEditingFieldKey(null);
    // Restore original answer
    const newEdited = { ...editedAnswers };
    delete newEdited[fieldKey];
    setEditedAnswers(newEdited);
  };

  const handleFieldChange = (fieldKey: string, value: string) => {
    setEditedAnswers({
      ...editedAnswers,
      [fieldKey]: value,
    });
  };

  const handleSubmit = () => {
    if (!next_action) return;

    // Merge edited answers with original answers from all fields
    const allAnswers: Record<string, string> = {};

    editable_fields.forEach((field) => {
      // Use edited answer if available, otherwise use current answer
      allAnswers[field.field_key] = editedAnswers[field.field_key] || field.current_answer;
    });

    // Send all answers (both edited and non-edited) along with action details
    onSubmit(allAnswers, next_action.action, {
      policy_id: next_action.policy_id,
      application_id: next_action.application_id,
    });
  };

  const handleCancel = () => {
    if (!back_action) return;

    onCancel?.(back_action.action, {
      policy_id: back_action.policy_id,
    });
  };

  const getDisplayValue = (field: EditableField) => {
    return editedAnswers[field.field_key] || field.current_answer;
  };

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        {subtitle && <p className="text-white/90 text-sm">{subtitle}</p>}
      </div>

      {/* Fields Review */}
      <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {editable_fields.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No information to review</p>
          </div>
        ) : (
          editable_fields.map((field) => {
            const isEditing = editingFieldKey === field.field_key;
            const displayValue = getDisplayValue(field);

            return (
              <div
                key={field.field_key}
                className="border border-gray-200 rounded-lg p-4 hover:border-brand-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">
                      {field.question_number}. {field.question}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => handleEditClick(field.field_key, field.current_answer)}
                      className="ml-2 text-brand-primary hover:text-brand-secondary text-sm font-medium flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    {field.field_type === "dropdown" && field.options ? (
                      <select
                        value={editedAnswers[field.field_key] || ""}
                        onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028678]/20"
                        autoFocus
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.field_type === "date" ? (
                      <input
                        type="date"
                        value={editedAnswers[field.field_key] || ""}
                        onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028678]/20"
                        autoFocus
                      />
                    ) : field.field_type === "number" ? (
                      <input
                        type="number"
                        value={editedAnswers[field.field_key] || ""}
                        onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028678]/20"
                        autoFocus
                      />
                    ) : field.field_type === "email" ? (
                      <input
                        type="email"
                        value={editedAnswers[field.field_key] || ""}
                        onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028678]/20"
                        autoFocus
                      />
                    ) : field.field_type === "tel" ? (
                      <input
                        type="tel"
                        value={editedAnswers[field.field_key] || ""}
                        onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028678]/20"
                        autoFocus
                      />
                    ) : (
                      <input
                        type="text"
                        value={editedAnswers[field.field_key] || ""}
                        onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                        className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#028678]/20"
                        autoFocus
                      />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(field.field_key)}
                        className="px-3 py-1.5 bg-brand-primary text-white text-sm rounded-lg hover:bg-brand-secondary transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancelEdit(field.field_key, field.current_answer)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1">
                    <p className="text-gray-900 font-medium">{displayValue}</p>
                    {editedAnswers[field.field_key] && editedAnswers[field.field_key] !== field.current_answer && (
                      <p className="text-sm text-gray-500 line-through mt-1">
                        Original: {field.current_answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between gap-3">
          {back_action && (
            <button
              onClick={handleCancel}
              disabled={editingFieldKey !== null}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                editingFieldKey !== null
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {back_action.title}
            </button>
          )}
          <div className="flex-1 text-right">
            <p className="text-sm text-gray-600">
              Please review all information carefully before submitting
            </p>
          </div>
          {next_action && (
            <button
              onClick={handleSubmit}
              disabled={editingFieldKey !== null}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                editingFieldKey !== null
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg"
              }`}
            >
              {next_action.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;

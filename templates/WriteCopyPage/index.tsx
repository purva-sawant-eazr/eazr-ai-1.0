"use client";

import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Loader from "@/components/Loader";
import PolicyOptions from "@/components/PolicyOptions";
import PolicyDetails from "@/components/PolicyDetails";
import QuestionForm from "@/components/QuestionForm";
import ReviewSubmit from "@/components/ReviewSubmit";
import PdfViewer from "@/components/PdfViewer";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { postAsk, postLoadChatSession } from "@/actions/chatActions";
import { getUserProfile } from "@/actions/userActions";
import { RootState, AppDispatch } from "@/store/store";

const WriteCopyPage = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { isLoading, messages, currentSessionId, chats } = useSelector((state: RootState) => state.chat);
  const { profile } = useSelector((state: RootState) => state.user);

  // 🔹 Load user profile on mount if not already loaded
  useEffect(() => {
    const stored = localStorage.getItem("session_data");
    if (stored && !profile) {
      try {
        const session = JSON.parse(stored);
        if (session.session_id && session.access_token) {
          dispatch(getUserProfile(session.session_id, session.access_token));
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    }
  }, [dispatch, profile]);

  // 🔹 Scroll to bottom on message change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Load from localStorage if chat is empty
  useEffect(() => {
    if (messages.length === 0) {
      const stored = localStorage.getItem("chat_messages");
      if (stored) {
        const savedMessages = JSON.parse(stored);
        if (savedMessages.length > 0) {
          // Manually hydrate Redux messages if needed (optional)
          console.log("Loaded messages from localStorage");
        }
      }
    }
  }, [messages]);

  // 🔹 Load old chat if opened from sidebar (only if not already loaded)
  useEffect(() => {
    if (chatId && typeof chatId === 'string') {
      // Check if this chat is already loaded and matches current session
      const isChatAlreadyLoaded =
        currentSessionId === chatId &&
        (chats as Record<string, any[]>)[chatId]?.length > 0;

      // Only load if not already loaded
      if (!isChatAlreadyLoaded) {
        console.log("📡 Loading chat session:", chatId);
        dispatch(postLoadChatSession(chatId)).catch((error: any) => {
          console.error("Failed to load chat:", error);
          // Show error message to user
          alert("Failed to load chat session. It may have been deleted.");
        });
      } else {
        console.log("✅ Chat already loaded, skipping API call");
      }
    }
  }, [chatId, dispatch, currentSessionId, chats]);

  // 🔹 Send message to API
  const handleSendMessage = (message: string, files?: File[]) => {
    if (!message.trim() && (!files || files.length === 0)) return;

    if (files && files.length > 0) {
      // Send with files
      dispatch(postAsk(message, { files }));
    } else {
      // Send without files
      dispatch(postAsk(message));
    }
  };

  // 🔹 Suggestion click handler
  const handleSuggestionClick = (suggestion: string) => {
    dispatch(postAsk(suggestion));
  };

  // 🔹 Policy selection handler
  const handlePolicySelect = (policyId: string, policyData: any) => {
    // Send policy selection back to API with action and policy_id
    const selectionMessage = `View details for ${policyData.title}`;
    dispatch(
      postAsk(selectionMessage, {
        action: policyData.action || "show_policy_details",
        policy_id: policyId,
        insurance_type: policyData.insurance_type || policyId,
      })
    );
  };

  // 🔹 Policy action handler (for next_action and back_action buttons)
  const handlePolicyAction = (action: string, policyId?: string, actionTitle?: string) => {
    // Send action to API
    const actionMessage = actionTitle || `Performing action: ${action}`;
    dispatch(
      postAsk(actionMessage, {
        action: action,
        policy_id: policyId,
        insurance_type: policyId,
      })
    );
  };

  // 🔹 Question answer handler
  const handleQuestionSubmit = (answer: string) => {
    // Send the answer as user input
    dispatch(postAsk(answer));
  };

  // 🔹 Question exit handler
  const handleQuestionExit = () => {
    // Send just "exit" without any action parameter (same as typing "exit" in chat)
    dispatch(postAsk("exit"));
  };

  // 🔹 Review submit handler
  const handleReviewSubmit = (
    editedFields: Record<string, string>,
    action: string,
    actionData?: any
  ) => {
    // Convert editedFields object to array format expected by backend
    const editedAnswersArray = Object.entries(editedFields).map(([field_key, value]) => ({
      field_key,
      value,
    }));

    // Send the action with all edited fields and metadata
    dispatch(
      postAsk("Submitting application", {
        action,
        policy_id: actionData?.policy_id,
        application_id: actionData?.application_id,
        edited_answers: editedAnswersArray,
      })
    );
  };

  // 🔹 Review cancel handler
  const handleReviewCancel = (action: string, actionData?: any) => {
    // Send back action
    dispatch(
      postAsk("Go back to previous step", {
        action,
        policy_id: actionData?.policy_id,
      })
    );
  };

  return (
    <Layout>
      <Chat titleHead="Eazr AI Assistant" onSendMessage={handleSendMessage} isLoading={isLoading}>
        {messages.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl mb-4 shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Start a Conversation
              </h3>
              <p className="text-text-tertiary text-sm leading-relaxed">
                Ask me anything! I can help you with insurance, loans, or
                account assistance — powered by Eazr AI.
              </p>
            </div>
          </div>
        ) : (
          <>
            {(() => {
              // Calculate the latest question number to disable previous questions
              const latestQuestionNumber = messages.reduce((max: number, msg: any) => {
                if (msg.role === "assistant" && msg.questionData?.question_number) {
                  return Math.max(max, msg.questionData.question_number);
                }
                return max;
              }, 0);

              return messages.map((message: any, index: number) => (
                <div key={index}>
                  {message.role === "user" ? (
                    <Question>
                      <div className="text-label-sm leading-relaxed text-white whitespace-pre-line">
                        {message.content}
                      </div>
                    </Question>
                  ) : (
                    <Answer>
                      <div className="text-label-sm leading-relaxed text-text-primary whitespace-pre-line">
                        {message.content}
                      </div>

                      {/* Display Review & Submit Form */}
                      {message.reviewData && (
                        <ReviewSubmit
                          title={message.reviewData.title}
                          subtitle={message.reviewData.subtitle}
                          editable_fields={message.reviewData.editable_fields}
                          next_action={message.reviewData.next_action}
                          back_action={message.reviewData.back_action}
                          onSubmit={handleReviewSubmit}
                          onCancel={handleReviewCancel}
                        />
                      )}

                      {/* Display Question Form */}
                      {message.questionData && (
                        <QuestionForm
                          message={message.questionData.message}
                          title={message.questionData.title}
                          options={message.questionData.options}
                          input_type={message.questionData.input_type}
                          required={message.questionData.required}
                          question_number={message.questionData.question_number}
                          total_questions={message.questionData.total_questions}
                          progress={message.questionData.progress}
                          exit_option={message.questionData.exit_option}
                          input_hint={message.questionData.input_hint}
                          disabled={
                            message.questionData.question_number &&
                            message.questionData.question_number < latestQuestionNumber
                          }
                          onSubmit={handleQuestionSubmit}
                          onExit={handleQuestionExit}
                        />
                      )}

                      {/* Display Policy Details (when user clicks View Details) */}
                      {message.policyDetails && (
                        <PolicyDetails
                          title={message.policyDetails.title}
                          productName={message.policyDetails.productName}
                          category={message.policyDetails.category}
                          eligibility={message.policyDetails.eligibility}
                          coverage_details={message.policyDetails.coverage_details}
                          features={message.policyDetails.features}
                          next_action={message.policyDetails.next_action}
                          back_action={message.policyDetails.back_action}
                          onActionClick={handlePolicyAction}
                        />
                      )}

                      {/* Display Policy Options (only if options is an object with policy data, not an array) */}
                      {message.options &&
                       typeof message.options === 'object' &&
                       !Array.isArray(message.options) &&
                       Object.keys(message.options).length > 0 && (
                        <PolicyOptions
                          options={message.options}
                          onSelectPolicy={handlePolicySelect}
                        />
                      )}

                      {/* Display PDF Viewer (when report_url is available) */}
                      {message.reportUrl && (
                        <PdfViewer
                          reportUrl={message.reportUrl}
                          title={message.reportTitle || "Report"}
                        />
                      )}

                      {/* Display Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((sug: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(sug)}
                              className="px-3 py-1.5 text-sm bg-white border border-border-light rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 shadow-sm"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </Answer>
                  )}
                </div>
              ));
            })()}
          </>
        )}

        {isLoading && (
          <Answer isLoading>
            <Loader />
          </Answer>
        )}

        <div ref={chatEndRef} />
      </Chat>
    </Layout>
  );
};

export default WriteCopyPage;

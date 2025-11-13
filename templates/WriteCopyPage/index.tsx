// "use client";
// import { useEffect, useState, useRef } from "react";
// import Layout from "@/components/Layout";
// import Chat from "@/components/Chat";
// import Question from "@/components/Question";
// import Answer from "@/components/Answer";
// import Loader from "@/components/Loader";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// const WriteCopyPage = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement>(null);
//   const [chatResponse, setChatResponse] = useState<any>(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // useEffect(() => {
//   //   const initialQuery = sessionStorage.getItem("chatQuery");

//   //   if (initialQuery) {
//   //     setMessages([{ role: "user", content: initialQuery }]);
//   //     sessionStorage.removeItem("chatQuery");
//   //     generateAIResponse(initialQuery);
//   //   }
//   // }, []);

// useEffect(() => {
//   // Try to get API response (from SearchBox)
//   const storedResponse = sessionStorage.getItem("eazrChatResponse");
//   const storedQuery = sessionStorage.getItem("chatQuery");

//   if (storedResponse) {
//     const parsed = JSON.parse(storedResponse);
//     setChatResponse(parsed);

//     const userQuery =
//       parsed?.metadata?.original_query || storedQuery || "User query";
//     const aiResponse = parsed?.data?.response || "No response received.";

//     setMessages([
//       { role: "user", content: userQuery },
//       { role: "assistant", content: aiResponse },
//     ]);

//     // Clean up after loading
//     sessionStorage.removeItem("eazrChatResponse");
//     sessionStorage.removeItem("chatQuery");
//   } else if (storedQuery) {
//     // Fallback for suggestion click
//     setMessages([{ role: "user", content: storedQuery }]);
//     generateAIResponse(storedQuery);
//     sessionStorage.removeItem("chatQuery");
//   }
// }, []);



//   const generateAIResponse = async (query: string) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       const aiResponse = generateResponseForQuery(query);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: aiResponse },
//       ]);
//       setIsLoading(false);
//     }, 1500);
//   };

//   const generateResponseForQuery = (query: string): string => {
//     const lowerQuery = query.toLowerCase();

//     if (lowerQuery.includes("landing")) {
//       return `I'll help you build an amazing landing page! Here's what I recommend:

// **Essential Sections:**
// - Hero Section with headline and CTA
// - Features or benefits area
// - Testimonials or trust signals
// - Pricing section (if applicable)
// - Final CTA section

// Would you like me to generate the layout or design code?`;
//     } else if (lowerQuery.includes("dashboard")) {
//       return `Let's build a stunning dashboard:

// **Features:**
// - Analytics cards
// - Graphs and tables
// - Sidebar navigation
// - Responsive grid layout

// Would you prefer a light or dark theme?`;
//     } else {
//       return `I'm ready to help you with "${query}". Could you tell me more about what you want to achieve?`;
//     }
//   };

//   const handleNewMessage = (message: string) => {
//     if (message.trim()) {
//       setMessages((prev) => [...prev, { role: "user", content: message }]);
//       generateAIResponse(message);
//     }
//   };

  
//   return (
//     <Layout>
//       <Chat titleHead="Eazr AI Assistant" onSendMessage={handleNewMessage}>
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full">
//             <div className="text-center max-w-md">
//               {/* AI Icon */}
//               <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-[#028678] to-[#00A896] rounded-2xl mb-4 shadow-lg">
//                 <span className="text-3xl">🤖</span>
//               </div>

//               <h3 className="text-2xl font-bold text-[#0E121B] mb-2">
//                 Start a Conversation
//               </h3>
//               <p className="text-[#6B7280] text-sm leading-relaxed">
//                 Ask me anything! I can help you build websites, components,
//                 dashboards, and more.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {messages.map((message, index) =>
//               message.role === "user" ? (
//                 <Question key={index}>
//                   <div className="text-[15px] leading-relaxed text-white whitespace-pre-line">
//                     {message.content}
//                   </div>
//                 </Question>
//               ) : (
//                 <Answer key={index}>
//                   <div className="text-[15px] leading-relaxed text-[#0E121B] whitespace-pre-line">
//                     {message.content}
//                   </div>
//                 </Answer>
//               )
//             )}
//           </>
//         )}

//         {isLoading && (
//           <Answer isLoading>
//             <Loader />
//           </Answer>
//         )}

//         <div ref={chatEndRef} />
//       </Chat>
//     </Layout>
//   );
// };

// export default WriteCopyPage;
//=============================================================================================== 7/11/2025
// "use client";

// import { useEffect, useState, useRef } from "react";
// import Layout from "@/components/Layout";
// import Chat from "@/components/Chat";
// import Question from "@/components/Question";
// import Answer from "@/components/Answer";
// import Loader from "@/components/Loader";
// import { useParams } from "next/navigation";


// interface Message {
//   role: "user" | "assistant";
//   content: string;
//   suggestions?: string[]; // optional suggestions from API
// }

// const WriteCopyPage = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement>(null);


// const { chatId } = useParams();
// console.log("Active Chat:", chatId);

//   // Auto-scroll to bottom on new message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   //  Load from SearchBox (redirected query)
//   useEffect(() => {
//     const storedResponse = sessionStorage.getItem("eazrChatResponse");
//     const storedQuery = sessionStorage.getItem("chatQuery");

//     if (storedResponse) {
//       const parsed = JSON.parse(storedResponse);
//       const userQuery =
//         parsed?.metadata?.original_query || storedQuery || "User query";
//       const aiResponse = parsed?.data?.response || "No response received.";

//       setMessages([
//         { role: "user", content: userQuery },
//         { role: "assistant", content: aiResponse },
//       ]);

//       sessionStorage.removeItem("eazrChatResponse");
//       sessionStorage.removeItem("chatQuery");
//     } else if (storedQuery) {
//       setMessages([{ role: "user", content: storedQuery }]);
//       handleSendToAPI(storedQuery);
//       sessionStorage.removeItem("chatQuery");
//     }
//   }, []);

//     //  Helper to read session data from localStorage
// // const getSessionData = () => {
// //   if (typeof window === "undefined") return null; // avoid SSR error
// //   try {
// //     const data = localStorage.getItem("session_data");
// //     return data ? JSON.parse(data) : null;
// //   } catch (err) {
// //     console.error("Error parsing session_data:", err);
// //     return null;
// //   }
// // };

//   //  Send query to your API (FormData) // just use BASE_URI instead of direct link and use axios
//   // const handleSendToAPI = async (query: string) => {
//   //   if (!query.trim()) return;
//   //   setIsLoading(true);

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("query", query);

//   //     const response = await fetch("https://eazr.ai.eazr.in/ask", {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     const data = await response.json();

//   //     console.log("API Response:", data);

//   //     // ✅ Handle both chat_message & guest_message
//   //     const messageType = data?.data?.type;
//   //     const aiText =
//   //       data?.data?.response ||
//   //       "⚠️ No response text received from Eazr AI.";
//   //     const suggestions = data?.data?.suggestions || [];

//   //     if (messageType === "chat_message" || messageType === "guest_message") {
//   //       setMessages((prev) => [
//   //         ...prev,
//   //         { role: "assistant", content: aiText, suggestions },
//   //       ]);
//   //     } else {
//   //       setMessages((prev) => [
//   //         ...prev,
//   //         {
//   //           role: "assistant",
//   //           content: "⚠️ Unexpected response type from server.",
//   //         },
//   //       ]);
//   //     }
//   //   } catch (error) {
//   //     console.error("API Error:", error);
//   //     setMessages((prev) => [
//   //       ...prev,
//   //       {
//   //         role: "assistant",
//   //         content:
//   //           "❌ There was an error connecting to the Eazr AI service. Please try again.",
//   //       },
//   //     ]);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };



//   //  Handle sending user message
  
//   const handleSendToAPI = async (query: string) => {
//   if (!query.trim()) return;
//   setIsLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("query", query);

//     //  Check if user is logged in
//     const sessionData = localStorage.getItem("session_data");
//     let session = null;

//     if (sessionData) {
//       try {
//         session = JSON.parse(sessionData);
//       } catch {
//         session = null;
//       }
//     }

//     // Append session fields if logged in
//     if (session?.access_token) {
//       formData.append("session_id", session.session_id);
//       formData.append("chat_session_id", session.chat_session_id);
//       formData.append("user_phone", session.user_phone);
//       formData.append("user_name", session.user_name || "User");
//       formData.append("user_id", session.user_id);
//       formData.append("access_token", session.access_token);
//     }

//     // Send to Eazr API
//     const response = await fetch("https://eazr.ai.eazr.in/ask", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     console.log(" Eazr API Response:", data);

//     //  Store/Update chat session IDs (so you continue same session)
//     if (data?.session_id && data?.chat_session_id && session) {
//       const updatedSession = {
//         ...session,
//         session_id: data.session_id,
//         chat_session_id: data.chat_session_id,
//       };
//       localStorage.setItem("session_data", JSON.stringify(updatedSession));
//     }

//     //  Extract AI text safely
//     const aiText =
//       data?.data?.response ||
//       data?.data?.message ||
//       "No response text received from Eazr AI.";

//     const suggestions = data?.data?.suggestions || [];

//     // Add AI response to chat
//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", content: aiText, suggestions },
//     ]);
//   } catch (error) {
//     console.error("API Error:", error);
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         content:
//           "There was an error connecting to the Eazr AI service. Please try again.",
//       },
//     ]);
//   } finally {
//     setIsLoading(false);
//   }
// };

  
//   const handleNewMessage = (message: string) => {
//     if (message.trim()) {
//       setMessages((prev) => [...prev, { role: "user", content: message }]);
//       handleSendToAPI(message);
//     }
//   };

//   //  Handle clicking suggestion buttons
//   const handleSuggestionClick = (suggestion: string) => {
//     setMessages((prev) => [...prev, { role: "user", content: suggestion }]);
//     handleSendToAPI(suggestion);
//   };

//   return (
//     <Layout>
//       <Chat titleHead="Eazr AI Assistant" onSendMessage={handleNewMessage}>
//         {/* Empty state */}
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full">
//             <div className="text-center max-w-md">
//               <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-[#028678] to-[#00A896] rounded-2xl mb-4 shadow-lg">
//                 <span className="text-3xl">🤖</span>
//               </div>
//               <h3 className="text-2xl font-bold text-[#0E121B] mb-2">
//                 Start a Conversation
//               </h3>
//               <p className="text-[#6B7280] text-sm leading-relaxed">
//                 Ask me anything! I can help you with insurance, loans, or
//                 account assistance — powered by Eazr AI.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Chat messages */}
//             {messages.map((message, index) => (
//               <div key={index}>
//                 {message.role === "user" ? (
//                   <Question>
//                     <div className="text-label-sm leading-relaxed text-white whitespace-pre-line">
//                       {message.content}
//                     </div>
//                   </Question>
//                 ) : (
//                   <Answer>
//                     <div className="text-label-sm leading-relaxed text-[#0E121B] whitespace-pre-line">
//                       {message.content}
//                     </div>

//                     {/* Suggestion buttons */}
//                     {message.suggestions && message.suggestions.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-3">
//                         {message.suggestions.map((sug, i) => (
//                           <button
//                             key={i}
//                             onClick={() => handleSuggestionClick(sug)}
//                             className="px-3 py-1.5 text-sm bg-white border border-[#E5E7EB] rounded-lg text-[#028678] hover:bg-[#028678] hover:text-white hover:border-[#028678] transition-all duration-200 shadow-sm"
//                           >
//                             {sug}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </Answer>
//                 )}
//               </div>
//             ))}
//           </>
//         )}

//         {/* Loading animation */}
//         {isLoading && (
//           <Answer isLoading>
//             <Loader />
//           </Answer>
//         )}

//         <div ref={chatEndRef} />
//       </Chat>
//     </Layout>
//   );
// };

// export default WriteCopyPage;

// "use client";

// import { useEffect, useRef } from "react";
// import Layout from "@/components/Layout";
// import Chat from "@/components/Chat";
// import Question from "@/components/Question";
// import Answer from "@/components/Answer";
// import Loader from "@/components/Loader";
// import { useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import {
//   appendChatMessage,
//   postLoadChatSession,
//   setActiveChat,
// } from "@/actions/chatActions";

// const WriteCopyPage = () => {
//   const chatEndRef = useRef<HTMLDivElement>(null);
//   const { chatId } = useParams();
//   const dispatch = useAppDispatch();

//   const { messages, isLoading, currentSessionId } = useAppSelector(
//     (state) => state.chat
//   );

//   //  Scroll to bottom when new messages appear
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   //  Load previous messages when chatId changes
//   useEffect(() => {
//     if (chatId) {
//       dispatch(setActiveChat(chatId as string));
//       dispatch(postLoadChatSession(chatId as string) as any);
//     }
//   }, [chatId, dispatch]);

//   //  Send message to API (keep as-is)
//   const handleSendToAPI = async (query: string) => {
//     if (!query.trim()) return;

//     // Add user message immediately to Redux
//     dispatch(appendChatMessage({ role: "user", content: query }));

//     try {
//       const formData = new FormData();
//       formData.append("query", query);

//       // Get session data from localStorage
//       const sessionData = localStorage.getItem("session_data");
//       let session = null;

//       if (sessionData) {
//         try {
//           session = JSON.parse(sessionData);
//         } catch {
//           session = null;
//         }
//       }

//       // Append user session data if available
//       if (session?.access_token) {
//         formData.append("session_id", session.session_id);
//         formData.append("chat_session_id", session.chat_session_id);
//         formData.append("user_phone", session.user_phone);
//         formData.append("user_name", session.user_name || "User");
//         formData.append("user_id", session.user_id);
//         formData.append("access_token", session.access_token);
//       }

//       // Call /ask API (same as your existing code)
//       const response = await fetch("https://eazr.ai.eazr.in/ask", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("🛰️ Eazr API Response:", data);

//       // Save new session if provided
//       if (data?.session_id && data?.chat_session_id && session) {
//         const updatedSession = {
//           ...session,
//           session_id: data.session_id,
//           chat_session_id: data.chat_session_id,
//         };
//         localStorage.setItem("session_data", JSON.stringify(updatedSession));
//       }

//       // Extract AI response safely
//       const aiText =
//         data?.data?.response ||
//         data?.data?.message ||
//         "No response text received from Eazr AI.";
//       const suggestions = data?.data?.suggestions || [];

//       // Add AI message to Redux
//       dispatch(
//         appendChatMessage({
//           role: "assistant",
//           content: aiText,
//           suggestions,
//         })
//       );
//     } catch (error) {
//       console.error("API Error:", error);

//       dispatch(
//         appendChatMessage({
//           role: "assistant",
//           content:
//             "❌ There was an error connecting to the Eazr AI service. Please try again.",
//         })
//       );
//     }
//   };

//   // 🟢 Handle new user message
//   const handleNewMessage = (message: string) => {
//     if (message.trim()) {
//       handleSendToAPI(message);
//     }
//   };

//   // 🟢 Handle clicking suggestion button
//   const handleSuggestionClick = (suggestion: string) => {
//     handleSendToAPI(suggestion);
//   };

//   // 🟢 Render UI (unchanged)
//   return (
//     <Layout>
//       <Chat titleHead="Eazr AI Assistant" onSendMessage={handleNewMessage}>
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full">
//             <div className="text-center max-w-md">
//               <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-[#028678] to-[#00A896] rounded-2xl mb-4 shadow-lg">
//                 <span className="text-3xl">🤖</span>
//               </div>
//               <h3 className="text-2xl font-bold text-[#0E121B] mb-2">
//                 Start a Conversation
//               </h3>
//               <p className="text-[#6B7280] text-sm leading-relaxed">
//                 Ask me anything! I can help you with insurance, loans, or
//                 account assistance — powered by Eazr AI.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {messages.map((message:any, index:any) => (
//               <div key={index}>
//                 {message.role === "user" ? (
//                   <Question>
//                     <div className="text-label-sm leading-relaxed text-white whitespace-pre-line">
//                       {message.content}
//                     </div>
//                   </Question>
//                 ) : (
//                   <Answer>
//                     <div className="text-label-sm leading-relaxed text-[#0E121B] whitespace-pre-line">
//                       {message.content}
//                     </div>

//                     {message.suggestions && message.suggestions.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-3">
//                         {message.suggestions.map((sug:any, i:any) => (
//                           <button
//                             key={i}
//                             onClick={() => handleSuggestionClick(sug)}
//                             className="px-3 py-1.5 text-sm bg-white border border-[#E5E7EB] rounded-lg text-[#028678] hover:bg-[#028678] hover:text-white hover:border-[#028678] transition-all duration-200 shadow-sm"
//                           >
//                             {sug}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </Answer>
//                 )}
//               </div>
//             ))}
//           </>
//         )}

//         {isLoading && (
//           <Answer isLoading>
//             <Loader />
//           </Answer>
//         )}

//         <div ref={chatEndRef} />
//       </Chat>
//     </Layout>
//   );
// };

// export default WriteCopyPage;


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
import { RootState, AppDispatch } from "@/store/store";

const WriteCopyPage = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { isLoading, messages, currentSessionId, chats } = useSelector((state: RootState) => state.chat);

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
        dispatch(postLoadChatSession(chatId));
      } else {
        console.log("✅ Chat already loaded, skipping API call");
      }
    }
  }, [chatId, dispatch]);

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
              <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-[#028678] to-[#00A896] rounded-2xl mb-4 shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0E121B] mb-2">
                Start a Conversation
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
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
                      <div className="text-label-sm leading-relaxed text-[#0E121B] whitespace-pre-line">
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
                              className="px-3 py-1.5 text-sm bg-white border border-[#E5E7EB] rounded-lg text-[#028678] hover:bg-[#028678] hover:text-white transition-all duration-200 shadow-sm"
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

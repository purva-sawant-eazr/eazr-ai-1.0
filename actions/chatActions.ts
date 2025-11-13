import {
  GET_USER_ALL_CHAT_FAILURE,
  GET_USER_ALL_CHAT_REQUEST,
  GET_USER_ALL_CHAT_SUCCESS,
  POST_NEW_CHAT_FAILURE,
  POST_NEW_CHAT_REQUEST,
  POST_NEW_CHAT_SUCCESS,
  POST_ASK_REQUEST,
  POST_ASK_SUCCESS,
  POST_ASK_FAILURE,
  POST_LOAD_CHAT_REQUEST,
  POST_LOAD_CHAT_SUCCESS,
  POST_LOAD_CHAT_FAILURE,
  SET_ACTIVE_CHAT,
  APPEND_CHAT_MESSAGE,
  MOVE_CHAT_TO_TOP,
  UPDATE_CHAT_TITLE_LOCAL,
  PUT_CHAT_TITLE_REQUEST,
  PUT_CHAT_TITLE_SUCCESS,
  PUT_CHAT_TITLE_FAILURE,
  ADD_NEW_CHAT_TO_LIST
} from "@/constants/actionTypes";
import axios from "axios";
import { AppDispatch } from "@/store/store";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

//post = new chat
export const postNewChat =
  (user_session_id: any, user_id: any, access_token: any, title = "New Chat") =>
  async (dispatch: any) => {
    dispatch({ type: POST_NEW_CHAT_REQUEST });
    try {
      const formBody = new URLSearchParams();
      formBody.append("user_session_id", user_session_id);
      formBody.append("user_id", String(user_id));
      formBody.append("access_token", access_token);
      formBody.append("title", title);

      const response = await fetch(`${baseURL}/new-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create new chat: ${response.status} ${text}`);
      }

      const data = await response.json();

      dispatch({ type: POST_NEW_CHAT_SUCCESS, payload: data });
      return { type: POST_NEW_CHAT_SUCCESS, payload: data };
    } catch (error: any) {
      dispatch({ type: POST_NEW_CHAT_FAILURE, payload: error.message });
      return { type: POST_NEW_CHAT_FAILURE, payload: error.message };
    }
  };

 //post= ask
// export const postAsk =
//   (
//     query: string | null
//   ) =>
//   async (dispatch: any) => {
//     dispatch({ type: POST_ASK_REQUEST });

//     try {
//       // Build FormData
//       const formData = new FormData();
//       if (query) formData.append("query", query);
//       // if (user_session_id) formData.append("user_session_id", user_session_id);
//       // if (chat_session_id) formData.append("chat_session_id", chat_session_id);
//       // if (session_id) formData.append("session_id", session_id);
//       // if (access_token) formData.append("access_token", access_token);
//       // if (user_id) formData.append("user_id", user_id.toString());
//       // if (user_phone) formData.append("user_phone", user_phone);
//       // if (action) formData.append("action", action);
//       // if (user_input) formData.append("user_input", user_input);
//       // if (assistance_type) formData.append("assistance_type", assistance_type);
//       // if (insurance_type) formData.append("insurance_type", insurance_type);
//       // if (service_type) formData.append("service_type", service_type);
//       // if (file_action) formData.append("file_action", file_action);
//       // if (vehicle_market_value !== undefined && vehicle_market_value !== null)
//       //   formData.append("vehicle_market_value", vehicle_market_value.toString());
//       // if (annual_income !== undefined && annual_income !== null)
//       //   formData.append("annual_income", annual_income.toString());
//       // if (policy_id) formData.append("policy_id", policy_id);
//       // if (application_id) formData.append("application_id", application_id);
//       // if (edited_answers) formData.append("edited_answers", edited_answers);
//       // if (model) formData.append("model", model);

//       // // Append multiple files (if present)
//       // if (files && Array.isArray(files)) {
//       //   files.forEach((f) => formData.append("files", f));
//       // }

//       // // Append single file (if present)
//       // if (file) formData.append("file", file);

//       // API Call

//       const response = await axios.post(`${baseURL}/ask`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           'Accept':'*/*'
//         },
//       });
//       dispatch({ type: POST_ASK_SUCCESS, payload: response.data });
//     } catch (error: any) {
//       dispatch({ type: POST_ASK_FAILURE, payload: error.message });
//     }
//   };




// ✅ Updated: Shows user message immediately, then fetches AI response
export const postAsk =
  (query: string | null, additionalParams?: {
    action?: string;
    policy_id?: string;
    insurance_type?: string;
    application_id?: string;
    edited_answers?: Array<{ field_key: string; value: string }> | Record<string, string>;
    files?: File[];
  }) =>
  async (dispatch: AppDispatch, getState: any) => {
    if (!query?.trim() && !additionalParams?.action && !additionalParams?.files?.length) return;

    // 🔹 Get current state
    const { chat } = getState();
    const currentMessages = chat.messages || [];

    // ✅ IMMEDIATELY add user message to UI (like Claude does)
    const userMessage = { role: "user", content: query };
    const messagesWithUser = [...currentMessages, userMessage];

    // Update Redux immediately to show user message
    dispatch({
      type: POST_ASK_REQUEST,
      payload: { messages: messagesWithUser },
    });

    try {
      const formData = new FormData();
      formData.append("query", query || "");

      // 🔹 Get session info (for continuity)
      const sessionData = localStorage.getItem("session_data");
      let session = sessionData ? JSON.parse(sessionData) : null;

      if (session?.access_token) {
        formData.append("session_id", session.session_id || "");
        formData.append("chat_session_id", session.chat_session_id || "");
        formData.append("user_id", session.user_id);
        formData.append("user_phone", session.user_phone || "");
        formData.append("user_name", session.user_name || "User");
        formData.append("access_token", session.access_token);
      }

      // 🔹 Add additional parameters if provided (for policy selection, etc.)
      if (additionalParams?.action) {
        formData.append("action", additionalParams.action);
      }
      if (additionalParams?.policy_id) {
        formData.append("policy_id", additionalParams.policy_id);
      }
      if (additionalParams?.insurance_type) {
        formData.append("insurance_type", additionalParams.insurance_type);
      }
      if (additionalParams?.application_id) {
        formData.append("application_id", additionalParams.application_id);
      }
      if (additionalParams?.edited_answers) {
        formData.append("edited_answers", JSON.stringify(additionalParams.edited_answers));
      }

      // 🔹 Add files if provided
      if (additionalParams?.files && additionalParams.files.length > 0) {
        additionalParams.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      // 🔹 Make API call
      const response = await axios.post(`${baseURL}/ask`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
      });

      const data = response.data;

      // 🔹 Extract AI response safely
      const aiText =
        data?.data?.response ||
        data?.data?.message ||
        "No response text received from Eazr AI.";
      const suggestions = data?.data?.suggestions || [];
      const options = data?.data?.options || null;
      const responseType = data?.response_type || null;

      // 🔹 Extract policy details if available (for policy_details response)
      const policyDetails = data?.data?.eligibility || data?.data?.coverage_details || data?.data?.features
        ? {
            title: data?.data?.title || "",
            productName: data?.data?.productName || "",
            category: data?.data?.category || "",
            eligibility: data?.data?.eligibility || [],
            coverage_details: data?.data?.coverage_details || [],
            features: data?.data?.features || [],
            next_action: data?.data?.next_action || null,
            back_action: data?.data?.back_action || null,
          }
        : null;

      // 🔹 Extract question data if available (for question response_type, but NOT review types)
      const questionData = data?.response_type === "question" && data?.data && data?.data?.type !== "review_and_edit_application"
        ? {
            message: data.data.message || "",
            title: data.data.title || "",
            options: data.data.options || [],
            input_type: data.data.input_type || "text",
            required: data.data.required !== false,
            question_number: data.data.question_number || null,
            total_questions: data.data.total_questions || null,
            progress: data.data.progress || null,
            exit_option: data.data.exit_option || null,
            input_hint: data.data.input_hint || null,
          }
        : null;

      // 🔹 Extract review data if available (for review response_type or review_and_edit_application type)
      const reviewData = (data?.response_type === "review" || data?.data?.type === "review_and_edit_application") && data?.data?.editable_fields
        ? {
            title: data.data.title || "Review and Submit",
            subtitle: data.data.subtitle || "",
            application_data: data.data.application_data || {},
            editable_fields: data.data.editable_fields || [],
            next_action: data.data.next_action || null,
            back_action: data.data.back_action || null,
          }
        : null;

      // 🔹 Save session continuity
      if (data?.session_id && data?.chat_session_id && session) {
        const updatedSession = {
          ...session,
          session_id: data.session_id,
          chat_session_id: data.chat_session_id,
        };
        localStorage.setItem("session_data", JSON.stringify(updatedSession));
      }

      // 🔹 Extract report URL if available (for insurance_analysis response_type)
      const reportUrl = data?.data?.report_url || null;
      const reportTitle = data?.data?.type === "insurance_analysis"
        ? "Insurance Gap Analysis Report"
        : "Report";

      // 🔹 Add AI response to messages
      const aiMessage = {
        role: "assistant",
        content: aiText,
        suggestions,
        options,
        responseType,
        policyDetails,
        questionData,
        reviewData,
        reportUrl,
        reportTitle,
      };
      const updatedMessages = [...messagesWithUser, aiMessage];

      // 🔹 Persist to localStorage
      localStorage.setItem("chat_messages", JSON.stringify(updatedMessages));

      // 🔹 Auto-update chat title if this is the first message
      if (currentMessages.length === 0 && query && session?.chat_session_id && session?.user_id) {
        const generatedTitle = generateChatTitle(query, aiText);

        // Update title locally immediately
        dispatch(updateChatTitleLocal(session.chat_session_id, generatedTitle));

        // Update on server (async, no need to await)
        dispatch(putChatTitle(session.chat_session_id, generatedTitle, session.user_id));
      }

      // 🔹 Dispatch success
      dispatch({
        type: POST_ASK_SUCCESS,
        payload: {
          ...data,
          updatedMessages,
        },
      });
    } catch (error: any) {
      console.error("POST_ASK_FAILURE:", error);
      dispatch({ type: POST_ASK_FAILURE, payload: error.message });
    }
  };


// GET= Get User Chat Sessions Endpoint
export const getUserALLChat =
  (user_id: number) => async (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_ALL_CHAT_REQUEST });

    try {
      // Fetch from correct API endpoint
      const response = await fetch(`${baseURL}/user/${user_id}/chat-sessions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch user chat sessions");

      const data = await response.json();

      dispatch({ type: GET_USER_ALL_CHAT_SUCCESS, payload: data });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unexpected error occurred";

      dispatch({
        type: GET_USER_ALL_CHAT_FAILURE,
        payload: message,
      });
    }
  };



  // 🧩 Helper: Read session data safely
const getSessionData = () => {
  try {
    const stored = localStorage.getItem("session_data");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// 🟦 POST = Load Chat Session
export const postLoadChatSession =
  (session_id: string, user_id?: number, message_limit: number | null = 10) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: POST_LOAD_CHAT_REQUEST });
    try {
      const session = getSessionData();

      // Resolve user_id if not passed explicitly
      const uid = user_id || session?.user_id;
      if (!session_id || !uid) throw new Error("Missing session_id or user_id");

      const body = {
        session_id,
        user_id: uid,
        message_limit,
      };

      const response = await fetch(`${baseURL}/load-chat-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load chat session");
      }

      //Update localStorage with current chat_session_id
      const updated = {
        ...session,
        chat_session_id: data.session_id,
        session_id: data.session_info?.session_id || session?.session_id,
      };
      localStorage.setItem("session_data", JSON.stringify(updated));

      //Dispatch Success
      dispatch({
        type: POST_LOAD_CHAT_SUCCESS,
        payload: {
          session_id: data.session_id,
          session_info: data.session_info,
          messages: data.messages || [],
          total_messages: data.total_messages || 0,
        },
      });
    } catch (error: any) {
      console.error("POST_LOAD_CHAT_FAILURE:", error);
      dispatch({
        type: POST_LOAD_CHAT_FAILURE,
        payload: error.message || "Unknown error",
      });
    }
  };

// Select a chat as active
export const setActiveChat = (chatId: string) => ({
  type: SET_ACTIVE_CHAT,
  payload: chatId,
});

//  Append message locally (user or assistant)
export const appendChatMessage = (message: any) => ({
  type: APPEND_CHAT_MESSAGE,
  payload: message,
});

// Move chat to top of the sidebar list
export const moveChatToTop = (sessionId: string) => ({
  type: MOVE_CHAT_TO_TOP,
  payload: sessionId,
});

// Update chat title locally (for immediate UI update)
export const updateChatTitleLocal = (sessionId: string, title: string) => ({
  type: UPDATE_CHAT_TITLE_LOCAL,
  payload: { sessionId, title },
});

// PUT = Update chat title on server
export const putChatTitle =
  (session_id: string, title: string, user_id: number) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: PUT_CHAT_TITLE_REQUEST });

    try {
      const formBody = new URLSearchParams();
      formBody.append("session_id", session_id);
      formBody.append("title", title);
      formBody.append("user_id", String(user_id));

      const response = await fetch(`${baseURL}/update-chat-title`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update chat title: ${response.status} ${text}`);
      }

      const data = await response.json();

      // Update locally first for immediate UI feedback
      dispatch(updateChatTitleLocal(session_id, title));

      dispatch({ type: PUT_CHAT_TITLE_SUCCESS, payload: data });
      return { type: PUT_CHAT_TITLE_SUCCESS, payload: data };
    } catch (error: any) {
      dispatch({ type: PUT_CHAT_TITLE_FAILURE, payload: error.message });
      return { type: PUT_CHAT_TITLE_FAILURE, payload: error.message };
    }
  };

// Helper function to generate title from first message
export const generateChatTitle = (userMessage: string, aiResponse: string): string => {
  // Take first 50 characters of user message, or first line of AI response
  const title = userMessage.trim().slice(0, 50);
  return title.length < userMessage.trim().length ? `${title}...` : title;
};

// Add new chat to list immediately (without API call)
export const addNewChatToList = (chatData: any) => ({
  type: ADD_NEW_CHAT_TO_LIST,
  payload: chatData,
});
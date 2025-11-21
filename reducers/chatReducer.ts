import {
  CHAT_CLEAR,
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
  APPEND_CHAT_MESSAGE,
  SET_ACTIVE_CHAT,
  MOVE_CHAT_TO_TOP,
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
  POST_SEARCH_CHAT_REQUEST,
  POST_SEARCH_CHAT_SUCCESS,
  POST_SEARCH_CHAT_FAILURE
} from "@/constants/actionTypes";

// const initialState = {
//   isLoading: false,
//   isSuccess: false,
//   data: null,
//   user: null,
//   error: null,
//  askResponse: null, 
// };


interface ChatState {
  isLoading: boolean;
  isSuccess: boolean;
  data: any;
  user: any;
  error: string | null;
  askResponse: any;
  currentSessionId: string | null;
  sessionInfo: any;
  messages: any[];
  totalMessages: number;
  chats:Record<string,any[]>;
  hasLoadedChatList: boolean; // Track if chat list has been fetched
  chatListLoading: boolean; // Separate loading state for chat list
  messagesLoading: boolean; // Separate loading state for messages
  searchResults: any; // Search results
  searchLoading: boolean; // Search loading state
  searchError: string | null; // Search error
}

const initialState: ChatState = {
  isLoading: false,
  isSuccess: false,
  data: null,
  user: null,
  error: null,
  askResponse: null,
  currentSessionId: null,
  sessionInfo: null,
  messages: [],
  totalMessages: 0,
  chats:{},
  hasLoadedChatList: false,
  chatListLoading: false,
  messagesLoading: false,
  searchResults: null,
  searchLoading: false,
  searchError: null,
};

export default function chatReducer(state = initialState, action: any) {
  switch (action.type) {

    //Request new chat, get all user chat, ask
    case GET_USER_ALL_CHAT_REQUEST:
      return { ...state, chatListLoading: true, isLoading: true, error: null, isSuccess: false };

    case POST_NEW_CHAT_REQUEST:
    case POST_LOAD_CHAT_REQUEST:
      return { ...state, messagesLoading: true, isLoading: true, error: null, isSuccess: false };

    case POST_ASK_REQUEST:
      // If payload contains messages, update them immediately (for showing user message)
      return {
        ...state,
        messagesLoading: true,
        isLoading: true,
        error: null,
        isSuccess: false,
        messages: action.payload?.messages || state.messages,
      };

    //sucess new chat, get all user chat
    case GET_USER_ALL_CHAT_SUCCESS:
      return {
        ...state,
        chatListLoading: false,
        isLoading: false,
        isSuccess: true,
        data: action.payload,
        hasLoadedChatList: true, // Mark that chat list has been loaded
      };

    case POST_NEW_CHAT_SUCCESS:
      return {
        ...state,
        messagesLoading: false,
        isLoading: false,
        isSuccess: true,
        currentSessionId: action.payload.chat_session_id,
        sessionInfo: action.payload,
        messages: [],
        totalMessages: 0,
        error: null,
      };

  case POST_ASK_SUCCESS: {
  const updatedMessages = action.payload?.updatedMessages || state.messages;

  //  Persist to localStorage
  try {
    localStorage.setItem("chat_messages", JSON.stringify(updatedMessages));
  } catch (e) {
    console.warn("Failed to persist chat messages:", e);
  }

  //  Return state WITHOUT modifying chatListLoading or data (to prevent sidebar re-render)
  return {
    ...state,
    messagesLoading: false,
    isLoading: false,
    isSuccess: true,
    askResponse: action.payload,
    messages: updatedMessages,
    chats: {
      ...state.chats,
      [state.currentSessionId || "temp"]: updatedMessages,
    },
  };
}



    //Load chat session success
    // case POST_LOAD_CHAT_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isSuccess: true,
    //     currentSessionId: action.payload.session_id,
    //     sessionInfo: action.payload.session_info,
    //     messages: action.payload.messages || [],
    //     totalMessages: action.payload.total_messages || 0,
    //     error: null,
    //   };

    case POST_LOAD_CHAT_SUCCESS: {
      const { session_id, session_info, messages = [], total_messages = 0 } =
        action.payload;

      //  Return state WITHOUT modifying chatListLoading or data
      return {
        ...state,
        messagesLoading: false,
        isLoading: false,
        isSuccess: true,
        currentSessionId: session_id,
        sessionInfo: session_info,
        messages,
        totalMessages: total_messages,
        chats: {
          ...state.chats,
          [session_id]: messages, // cache messages for that chat
        },
        error: null,
      };
    }



    //failure of new chat, get all user chat , ask 
    case POST_NEW_CHAT_FAILURE:
    case GET_USER_ALL_CHAT_FAILURE:
    case POST_ASK_FAILURE:
    case POST_LOAD_CHAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };

    // case APPEND_CHAT_MESSAGE:
    //   return { ...state, messages: [...state.messages, action.payload] };

     // Set active chat manually (no reload)
    case SET_ACTIVE_CHAT: {
      const activeId = action.payload;
      const existingMessages = state.chats[activeId] || [];

      return {
        ...state,
        currentSessionId: activeId,
        messages: existingMessages,
        error: null,
      };
    }

    // Append new message locally (for continuation)
    case APPEND_CHAT_MESSAGE: {
      const activeId = state.currentSessionId;
      if (!activeId) return state; // no active chat yet

      const updatedMessages = [...(state.chats[activeId] || []), action.payload];

      return {
        ...state,
        messages: updatedMessages,
        chats: {
          ...state.chats,
          [activeId]: updatedMessages,
        },
        totalMessages: updatedMessages.length,
      };
    }

    // Move selected chat to top of the list
    case MOVE_CHAT_TO_TOP: {
      const selectedSessionId = action.payload;
      if (!state.data?.chats) return state;

      const chats = state.data.chats;
      const selectedIndex = chats.findIndex(
        (chat: any) => chat.session_id === selectedSessionId
      );

      if (selectedIndex === -1 || selectedIndex === 0) return state; // Already at top or not found

      // Move chat to top
      const selectedChat = chats[selectedIndex];
      const reorderedChats = [
        selectedChat,
        ...chats.slice(0, selectedIndex),
        ...chats.slice(selectedIndex + 1),
      ];

      // Reorganize into time-based groups
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const organized = reorderedChats.reduce(
        (acc: any, chat: any) => {
          const lastActivity = new Date(chat.last_activity);

          if (lastActivity >= today) {
            acc.today.push(chat);
          } else if (lastActivity >= yesterday) {
            acc.yesterday.push(chat);
          } else if (lastActivity >= last7Days) {
            acc.last_7_days.push(chat);
          } else if (lastActivity >= last30Days) {
            acc.last_30_days.push(chat);
          } else {
            acc.older.push(chat);
          }

          return acc;
        },
        {
          today: [],
          yesterday: [],
          last_7_days: [],
          last_30_days: [],
          older: [],
        }
      );

      return {
        ...state,
        data: {
          ...state.data,
          chats: reorderedChats,
          organized_chats: organized,
        },
      };
    }

    //Update chat title locally
    case "UPDATE_CHAT_TITLE_LOCAL": {
      const { sessionId, title } = action.payload;
      if (!state.data?.chats) return state;

      const chats = state.data.chats;
      const updatedChats = chats.map((chat: any) =>
        chat.session_id === sessionId || chat.chat_session_id === sessionId
          ? { ...chat, title }
          : chat
      );

      // Re-organize into time-based groups
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const organized = updatedChats.reduce(
        (acc: any, chat: any) => {
          const lastActivity = new Date(chat.last_activity);

          if (lastActivity >= today) {
            acc.today.push(chat);
          } else if (lastActivity >= yesterday) {
            acc.yesterday.push(chat);
          } else if (lastActivity >= last7Days) {
            acc.last_7_days.push(chat);
          } else if (lastActivity >= last30Days) {
            acc.last_30_days.push(chat);
          } else {
            acc.older.push(chat);
          }

          return acc;
        },
        {
          today: [],
          yesterday: [],
          last_7_days: [],
          last_30_days: [],
          older: [],
        }
      );

      return {
        ...state,
        data: {
          ...state.data,
          chats: updatedChats,
          organized_chats: organized,
        },
      };
    }

    // Add new chat to list immediately (at top)
    case "ADD_NEW_CHAT_TO_LIST": {
      const newChat = action.payload;
      const existingChats = state.data?.chats || [];

      // Add new chat at the top
      const updatedChats = [newChat, ...existingChats];

      // Organize into time-based groups with new chat at top
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const organized = updatedChats.reduce(
        (acc: any, chat: any) => {
          const lastActivity = new Date(chat.last_activity || new Date());

          if (lastActivity >= today) {
            acc.today.push(chat);
          } else if (lastActivity >= yesterday) {
            acc.yesterday.push(chat);
          } else if (lastActivity >= last7Days) {
            acc.last_7_days.push(chat);
          } else if (lastActivity >= last30Days) {
            acc.last_30_days.push(chat);
          } else {
            acc.older.push(chat);
          }

          return acc;
        },
        {
          today: [],
          yesterday: [],
          last_7_days: [],
          last_30_days: [],
          older: [],
        }
      );

      return {
        ...state,
        data: {
          ...state.data,
          chats: updatedChats,
          organized_chats: organized,
        },
      };
    }

    //Delete chat from list
    case DELETE_CHAT_REQUEST:
      return { ...state, isLoading: true, error: null };

    case DELETE_CHAT_SUCCESS: {
      const deletedSessionId = action.payload.session_id;
      if (!state.data?.chats) return state;

      // Remove the deleted chat from the list
      const updatedChats = state.data.chats.filter(
        (chat: any) => chat.session_id !== deletedSessionId && chat.chat_session_id !== deletedSessionId
      );

      // Re-organize into time-based groups
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const organized = updatedChats.reduce(
        (acc: any, chat: any) => {
          const lastActivity = new Date(chat.last_activity);

          if (lastActivity >= today) {
            acc.today.push(chat);
          } else if (lastActivity >= yesterday) {
            acc.yesterday.push(chat);
          } else if (lastActivity >= last7Days) {
            acc.last_7_days.push(chat);
          } else if (lastActivity >= last30Days) {
            acc.last_30_days.push(chat);
          } else {
            acc.older.push(chat);
          }

          return acc;
        },
        {
          today: [],
          yesterday: [],
          last_7_days: [],
          last_30_days: [],
          older: [],
        }
      );

      // Remove from chats cache
      const updatedChatsCache = { ...state.chats };
      delete updatedChatsCache[deletedSessionId];

      // Clear current session if it's the deleted one
      const shouldClearSession = state.currentSessionId === deletedSessionId;

      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          chats: updatedChats,
          organized_chats: organized,
        },
        chats: updatedChatsCache,
        ...(shouldClearSession && {
          currentSessionId: null,
          messages: [],
          totalMessages: 0,
          sessionInfo: null,
        }),
      };
    }

    case DELETE_CHAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Search chat cases
    case POST_SEARCH_CHAT_REQUEST:
      return {
        ...state,
        searchLoading: true,
        searchError: null,
        searchResults: null,
      };

    case POST_SEARCH_CHAT_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResults: action.payload,
        searchError: null,
      };

    case POST_SEARCH_CHAT_FAILURE:
      return {
        ...state,
        searchLoading: false,
        searchError: action.payload,
        searchResults: null,
      };

    case CHAT_CLEAR:
      return initialState;
    default:
      return state;
  }
}

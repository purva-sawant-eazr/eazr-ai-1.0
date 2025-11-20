"use client";
import { useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import {
  postLoadChatSession,
  getUserALLChat,
  moveChatToTop,
  deleteChat,
} from "@/actions/chatActions";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import ChatItem from "../ChatItem";
import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "@/store/store";


const SidebarChats = memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  //  Chat list state from Redux (isolated from messages)
const { data, chatListLoading, error, hasLoadedChatList } = useSelector(
  (state: RootState) => ({
    data: state.chat.data,
    chatListLoading: state.chat.chatListLoading,
    error: state.chat.error,
    hasLoadedChatList: state.chat.hasLoadedChatList,
  }),
  shallowEqual //  prevents re-render unless one of these values changes
);

  // Load all user chats ONLY ONCE on initial mount
  useEffect(() => {
    // Skip if chat list has already been loaded
    if (hasLoadedChatList) {
      console.log(" Chat list already loaded, skipping API call");
      return;
    }

    try {
      const stored = localStorage.getItem("session_data");
      const session = stored ? JSON.parse(stored) : null;
      if (session?.user_id) {
        console.log("📡 Fetching chat list for user:", session.user_id);
        dispatch(getUserALLChat(session.user_id));
      }
    } catch (err) {
      console.error("Failed to parse session_data:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ⚠️ Empty dependency array = run ONLY on mount

  // Handle chat click - Move to top and load messages
  const handleOpenChat = async (session_id: string) => {
    try {
      // ✅ Move selected chat to top of sidebar
      dispatch(moveChatToTop(session_id));

      // Load the chat messages but DON'T refresh the chat list
      await dispatch(postLoadChatSession(session_id) as any);
      router.push(`/write-copy/${session_id}`);

      // ⚠️ DO NOT call getUserALLChat here - it causes sidebar to reload
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  // ✅ Handle delete chat
  const handleDeleteChat = async (session_id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Confirm deletion
    if (!confirm("Are you sure you want to delete this chat?")) {
      return;
    }

    try {
      const stored = localStorage.getItem("session_data");
      const session = stored ? JSON.parse(stored) : null;

      if (!session?.user_id) {
        console.error("No user_id found in session");
        return;
      }

      // Soft delete by default (hard_delete: false)
      await dispatch(deleteChat(session_id, session.user_id, false) as any);

      // If the deleted chat was the current one, navigate to home
      if (session.chat_session_id === session_id) {
        localStorage.removeItem("chat_messages");
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
      alert("Failed to delete chat. Please try again.");
    }
  };

  // 🔹 Format timestamp helper
  const formatTime = (iso: string) => {
    try {
      const d = new Date(iso);
      const now = new Date();
      const diffInHours = (now.getTime() - d.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 24)
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      if (diffInHours < 48) return "Yesterday";
      if (diffInHours < 168)
        return d.toLocaleDateString([], { weekday: "short" });
      return d.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  // 🔹 Render grouped chat sections
  const renderChatGroup = (label: string, chats: any[]) => {
    if (!chats?.length) return null;
    return (
      <div className="mb-6">
        <h3 className="text-[11px] font-semibold uppercase text-gray-500 tracking-wider px-3 mb-2">
          {label}
        </h3>
        <div className="flex flex-col gap-0.5">
      {chats.map((chat: any) => (
  <ChatItem
    key={chat.session_id}
    chat={chat}
    onOpen={handleOpenChat}
    onDelete={handleDeleteChat}
    formatTime={formatTime}
  />
))}

        </div>
      </div>
    );
  };

  // 🔹 Loading skeleton
  if (chatListLoading) {
    return (
      <div className="flex flex-col gap-4 px-3 py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-3 bg-gray-100 rounded w-full ml-7"></div>
          </div>
        ))}
      </div>
    );
  }

  // 🔹 Error message
  if (error) {
    return (
      <div className="px-3 py-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
          <svg
            className="w-4 h-4 text-red-500 flex-shrink-0"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="text-[12px] text-red-700">Failed to load chats</div>
        </div>
      </div>
    );
  }

  const organized = data?.organized_chats || {};
  const allChats = data?.chats || [];

  // 🔹 Empty state
  if (!allChats.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-600 font-medium mb-1">No chats yet</p>
        <p className="text-xs text-gray-400">Start a new conversation</p>
      </div>
    );
  }

  // 🔹 Render grouped chats
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 py-1.5">
      {renderChatGroup("Today", organized.today)}
      {renderChatGroup("Yesterday", organized.yesterday)}
      {renderChatGroup("Last 7 Days", organized.last_7_days)}
      {renderChatGroup("Last 30 Days", organized.last_30_days)}
      {renderChatGroup("Older", organized.older)}
    </div>
  );
});

SidebarChats.displayName = 'SidebarChats';

export default SidebarChats;

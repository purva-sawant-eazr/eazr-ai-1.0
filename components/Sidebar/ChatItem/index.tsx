// src/components/Sidebar/ChatItem.tsx
import React from "react";
import Image from "next/image";

interface ChatItemProps {
  chat: any;
  onOpen: (id: string) => void;
  formatTime: (iso: string) => string;
}

const ChatItem = React.memo(({ chat, onOpen, formatTime }: ChatItemProps) => {
  return (
    <button
      onClick={() => onOpen(chat.session_id)}
      className="group relative flex flex-col text-left px-3 py-2.5 rounded-lg hover:bg-gray-100/80 transition-all"
    >
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
          <Image
            src="/images/logo/eazr_logo.png"
            alt="Chat"
            width={18}
            height={18}
            className="rounded-md object-contain opacity-90"
          />
          <span className="font-medium text-[13px] text-gray-900 truncate">
            {chat.title || chat.first_message_preview || "Untitled Chat"}
          </span>
        </div>
        <span className="text-[11px] text-gray-400 ml-2 flex-shrink-0">
          {formatTime(chat.last_activity)}
        </span>
      </div>

      <div className="text-[12px] text-gray-500 truncate pl-[26px]">
        {chat.first_message_preview ||
          chat.last_message_preview ||
          "No messages yet"}
      </div>
    </button>
  );
});

export default ChatItem;

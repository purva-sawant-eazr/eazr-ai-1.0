// src/components/Sidebar/ChatItem.tsx
import React, { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface ChatItemProps {
  chat: any;
  onOpen: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  formatTime: (iso: string) => string;
}

const ChatItem = React.memo(({ chat, onOpen, onDelete, formatTime }: ChatItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening chat when clicking delete
    setIsDeleting(true);
    try {
      await onDelete(chat.session_id, e);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClick = () => {
    if (!isDeleting) {
      onOpen(chat.session_id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col text-left px-3 py-2.5 rounded-lg hover:bg-gray-100/80 transition-all cursor-pointer"
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
        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
          <span className="text-[11px] text-gray-400">
            {formatTime(chat.last_activity)}
          </span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-50 transition-all disabled:opacity-50"
            title="Delete chat"
            aria-label="Delete chat"
          >
            <Trash2
              size={14}
              className={`transition-colors ${
                isDeleting ? 'text-gray-400' : 'text-gray-500 hover:text-red-600'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="text-[12px] text-gray-500 truncate pl-[26px]">
        {chat.first_message_preview ||
          chat.last_message_preview ||
          "No messages yet"}
      </div>
    </div>
  );
});

ChatItem.displayName = "ChatItem";

export default ChatItem;

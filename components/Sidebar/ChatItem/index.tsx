import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Icon from "@/components/Icon";

interface ChatItemProps {
  chat: any;
  onOpen: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onRename: (id: string, newTitle: string) => void;
  formatTime: (iso: string) => string;
}

const ChatItem = React.memo(
  ({ chat, onOpen, onDelete, onRename, formatTime }: ChatItemProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDeleting(true);
      setIsMenuOpen(false);
      try {
        await onDelete(chat.session_id, e);
      } finally {
        setIsDeleting(false);
      }
    };

    const handleClick = () => {
      if (!isDeleting && !isRenaming) {
        onOpen(chat.session_id);
      }
    };

    const handleMenuToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsMenuOpen(!isMenuOpen);
    };

    const handleRenameClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsMenuOpen(false);
      setRenameValue(chat.title || chat.first_message_preview || "Untitled Chat");
      setIsRenaming(true);
    };

    const handleRenameSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (renameValue.trim()) {
        onRename(chat.session_id, renameValue.trim());
        setIsRenaming(false);
      }
    };

    const handleRenameCancel = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsRenaming(false);
      setRenameValue("");
    };

    const handleInputClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      };

      if (isMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMenuOpen]);

    // Focus input when renaming starts
    useEffect(() => {
      if (isRenaming && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isRenaming]);

    return (
      <div
        onClick={handleClick}
        className="group relative flex flex-col text-left px-2.5 py-1 rounded-lg hover:bg-gray-100/80 transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center overflow-hidden flex-1 min-w-0">
            {isRenaming ? (
              <form onSubmit={handleRenameSubmit} className="flex items-center gap-2 w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onClick={handleInputClick}
                  className="flex-1 px-2 py-1 text-[13px] font-medium text-gray-900 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={100}
                />
                <button
                  type="submit"
                  onClick={handleInputClick}
                  className="p-1 text-green-600 hover:text-green-700"
                  title="Save"
                >
                  <Icon className="fill-green-600" name="check" />
                </button>
                <button
                  type="button"
                  onClick={handleRenameCancel}
                  className="p-1 text-red-600 hover:text-red-700"
                  title="Cancel"
                >
                  <Icon className="fill-red-600" name="close" />
                </button>
              </form>
            ) : (
              <span className="font-medium text-[13px] text-gray-900 truncate">
                {chat.title || chat.first_message_preview || "Untitled Chat"}
              </span>
            )}
          </div>
          {!isRenaming && (
            <div className="flex items-center gap-1.5 ml-2 flex-shrink-0 relative" ref={menuRef}>
            {/* Three-dot menu button */}
            <button
              onClick={handleMenuToggle}
              className="max-md:opacity-100 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-gray-100 transition-all"
              title="Options"
              aria-label="Chat options"
            >
              <Icon
                className="fill-gray-500 hover:fill-gray-700"
                name="dots"
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-8 w-48 bg-white border border-stroke-soft-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    // TODO: Implement share functionality
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-strong-950 hover:bg-weak-100 transition-all duration-200"
                >
                  <Icon className="fill-sub-600" name="share" />
                  <span className="font-medium">Share</span>
                </button>

                <button
                  onClick={handleRenameClick}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-strong-950 hover:bg-weak-100 transition-all duration-200"
                >
                  <Icon className="fill-sub-600" name="edit" />
                  <span className="font-medium">Rename</span>
                </button>

                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    // TODO: Implement move to project functionality
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-strong-950 hover:bg-weak-100 transition-all duration-200"
                >
                  <Icon className="fill-sub-600" name="folder" />
                  <span className="font-medium">Move to project</span>
                  <Icon className="fill-sub-600 ml-auto" name="chevron" />
                </button> */}

                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    // TODO: Implement archive functionality
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-strong-950 hover:bg-weak-100 transition-all duration-200"
                >
                  <Icon className="fill-sub-600" name="archive" />
                  <span className="font-medium">Archive</span>
                </button> */}

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-stroke-soft-200 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  <span className="font-medium">Delete</span>
                </button>
              </div>
            )}
          </div>
          )}
        </div>

        {/* <div className="text-[12px] text-gray-500 truncate pl-[26px]">
        {chat.first_message_preview ||
          chat.last_message_preview ||
          "No messages yet"}
      </div> */}
      </div>
    );
  }
);

ChatItem.displayName = "ChatItem";

export default ChatItem;

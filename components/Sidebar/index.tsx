"use client";
import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import ModalShare from "@/components/ModalShare";
import ModalSettings from "@/components/ModalSettings";
import Button from "./Button";
import User from "./User";
import InvitePeople from "./InvitePeople";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import Image from "next/image";
import SidebarChats from "./SidebarChats";
import { postNewChat, addNewChatToList, searchChats } from "@/actions/chatActions";

type Props = {
  visible: boolean;
  onClose: () => void;
  onClickNewChat: () => void;
  onCollapseChange?: (collapsed: boolean) => void;
};

const Sidebar = ({ visible, onClose, onClickNewChat, onCollapseChange }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { chatListLoading, searchLoading } = useAppSelector((state) => state.chat);

  const [open, setOpen] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [openModalInvite, setOpenModalInvite] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapseChange?.(collapsed);
  };

  const handleNewChatClick = async () => {
    try {
      // Get stored session
      const stored = localStorage.getItem("session_data");
      if (!stored) {
        alert("Please log in to start a new chat.");
        router.push("/");
        return;
      }

      const session = JSON.parse(stored);

      //Extract required fields
      const user_session_id = session.session_id;
      const user_id = session.user_id;
      const access_token = session.access_token;

      //Validate all values exist
      if (!user_session_id || !user_id || !access_token) {
        console.warn("Invalid session data:", session);
        alert("Invalid session data. Please log in again.");
        router.push("/");
        return;
      }

      console.log("Creating new chat...");

      // Dispatch Redux action to create new chat
      const result: any = await dispatch(
        postNewChat(user_session_id, user_id, access_token, "New Chat")
      );

      console.log("🛰️ /new-chat Response:", result);

      //  Handle errors
      if (result.type === "POST_NEW_CHAT_FAILURE") {
        alert("Failed to create new chat. Please try again.");
        return;
      }

      const data = result.payload;

      //Update session_data for continuity
      const updatedSession = {
        ...session,
        chat_session_id: data.chat_session_id,
        session_id: data.user_session_id || session.session_id,
      };
      localStorage.setItem("session_data", JSON.stringify(updatedSession));

      //Add new chat to sidebar immediately (no reload)
      const newChatItem = {
        session_id: data.chat_session_id,
        chat_session_id: data.chat_session_id,
        title: "New Chat",
        last_activity: new Date().toISOString(),
        created_at: new Date().toISOString(),
        user_id: user_id,
      };
      dispatch(addNewChatToList(newChatItem));

      //Redirect to new chat page
      router.push(`/write-copy/${encodeURIComponent(data.chat_session_id)}`);
    } catch (err) {
      console.error("New Chat Error:", err);
      alert("Something went wrong while creating a new chat.");
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Only search if query has at least 2 characters
    if (query.trim().length >= 2) {
      try {
        const stored = localStorage.getItem("session_data");
        if (!stored) return;

        const session = JSON.parse(stored);
        const user_id = session.user_id;

        if (!user_id) return;

        // Dispatch search action
        await dispatch(searchChats(user_id, query.trim(), 20));
      } catch (err) {
        console.error("Search Error:", err);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      {/* Overlay for mobile - click to close */}
      {visible && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 bg-white shadow-[0_0_1.25rem_0_rgba(0,0,0,0.03)]
          max-lg:z-20 max-lg:shadow-2xl
          max-lg:transition-transform max-md:p-4 ${
            isCollapsed ? "w-16" : "w-80 max-3xl:w-65 max-lg:w-75 max-md:w-[70%]"
          } ${
            visible ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
      >
        {/* Fixed Header Section */}
        <div className="flex-none border-b border-stroke-soft-200">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-end px-3 py-2 lg:hidden">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <Icon className="fill-gray-600" name="close" />
            </button>
          </div>

          {/* Header with Logo and Collapse Icon */}
          <div className="flex items-center justify-between px-3 py-3">
            {isCollapsed ? (
              <Link
                className="group relative flex items-center justify-center w-full h-10 rounded-xl transition-colors hover:bg-gray-100"
                href="/"
                onClick={onClickNewChat}
              >
                <Image
                  src="/images/logo/eazr_logo.png"
                  alt="Eazr AI Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ objectFit: "contain" }}
                />
              </Link>
            ) : (
              <>
                <Link
                  className="group relative flex items-center shrink-0 gap-2 h-10 px-2 rounded-xl text-label-sm transition-colors hover:text-blue-500 flex-1"
                  href="/"
                  onClick={onClickNewChat}
                >
                  <Image
                    src="/images/logo/eazr_logo.png"
                    alt="Eazr AI Logo"
                    width={120}
                    height={40}
                    className="w-5 h-5 rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ objectFit: "contain" }}
                  />
                  <span className="text-strong-950 transition-colors group-hover:text-blue-500">
                    Chat With Eazr AI 1.0
                  </span>
                </Link>

                {/* Collapse Button */}
                <button
                  onClick={() => handleCollapse(true)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200 max-lg:hidden"
                  aria-label="Collapse sidebar"
                >
                  <Icon
                    className="fill-strong-950 -rotate-90 transition-colors hover:fill-blue-500"
                    name="chevron"
                  />
                </button>
              </>
            )}
          </div>

          {/* Expand Button when Collapsed */}
          {isCollapsed && (
            <div className="flex items-center justify-center px-2 pb-2 max-lg:hidden">
              <button
                onClick={() => handleCollapse(false)}
                className="flex items-center justify-center w-12 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200"
                aria-label="Expand sidebar"
              >
                <Icon
                  className="fill-strong-950 rotate-90 transition-colors hover:fill-blue-500"
                  name="chevron"
                />
              </button>
            </div>
          )}

          {/* New Chat Button */}
          {!isCollapsed && (
            <div className="px-2 pb-2">
              <button
                onClick={handleNewChatClick}
                disabled={chatListLoading}
                className={`flex items-center justify-start gap-2 h-8 w-full px-3 rounded-xl font-medium transition-all duration-200 ${
                  chatListLoading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-brand-secondary/10 text-brand-primary hover:bg-brand-primary/20 shadow-sm"
                }`}
              >
                <span className="material-symbols-outlined text-brand-primary text-[15px]">
                  chat_add_on
                </span>
                <span>{chatListLoading ? "Starting..." : "New Chat"}</span>
              </button>
            </div>
          )}

          {/* Search Input */}
          {!isCollapsed && (
            <div className="px-2 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-8 pl-10 pr-10 rounded-xl border border-stroke-soft-200 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all duration-200 text-sm"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[15px]">
                  search
                </span>
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg  transition-colors"
                  >
                    <span className="material-symbols-outlined text-gray-400 text-[8px]">
                      close
                    </span>
                  </button>
                )}
                {searchLoading && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Collapsed New Chat Icon */}
          {isCollapsed && (
            <div className="px-2 pb-2">
              <button
                onClick={handleNewChatClick}
                disabled={chatListLoading}
                className={`flex items-center justify-center w-12 h-12 mx-auto rounded-xl transition-all duration-200 ${
                  chatListLoading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-brand-secondary/10 hover:bg-brand-primary/20"
                }`}
                title="New Chat"
              >
                <span className="material-symbols-outlined text-brand-primary text-[20px]">
                  chat_add_on
                </span>
              </button>
            </div>
          )}

          {/* Collapsed Search Icon */}
          {isCollapsed && (
            <div className="px-2 pb-3">
              <button
                className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl transition-all duration-200 bg-brand-secondary/10 hover:bg-brand-primary/20"
                title="Search (Expand sidebar to search)"
                onClick={() => handleCollapse(false)}
              >
                <span className="material-symbols-outlined text-brand-primary text-[20px]">
                  search
                </span>
              </button>
            </div>
          )}

          
        </div>

        {/* Scrollable Middle Section - Chat History */}
        <div className="flex-1 overflow-y-auto sidebar-scrollbar">
          {!isCollapsed ? (
            <div className="px-3 py-2">
              <SidebarChats searchQuery={searchQuery} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-2 py-2">
              {/* Collapsed chat icons can be added here if needed */}
            </div>
          )}
        </div>

        {/* Fixed User Section at Bottom */}
        <User isCollapsed={isCollapsed} />
      </div>

      {/* Modals */}
      {/* <ModalSettings open={open} onClose={() => setOpen(false)} />
      <ModalShare
        open={openModalShare}
        onClose={() => setOpenModalShare(false)}
      />
      <Modal
        classWrapper="max-w-100"
        open={openModalInvite}
        onClose={() => setOpenModalInvite(false)}
      >
        <InvitePeople />
      </Modal> */}
    </>
  );
};

export default Sidebar;

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Icon from "@/components/Icon";
// import Modal from "@/components/Modal";
// import ModalShare from "@/components/ModalShare";
// import ModalSettings from "@/components/ModalSettings";
// import Button from "./Button";
// import User from "./User";
// import InvitePeople from "./InvitePeople";
// import { useRouter } from "next/navigation";
// import { useAppSelector, useAppDispatch } from "@/store/hook";
// import Image from "next/image";
// import SidebarChats from "./SidebarChats";
// import { postNewChat, addNewChatToList } from "@/actions/chatActions";

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   onClickNewChat: () => void;
// };

// const Sidebar = ({ visible, onClose, onClickNewChat }: Props) => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { chatListLoading } = useAppSelector((state) => state.chat);

//   const [open, setOpen] = useState(false);
//   const [openModalShare, setOpenModalShare] = useState(false);
//   const [openModalInvite, setOpenModalInvite] = useState(false);

//   const handleNewChatClick = async () => {
//     try {
//       // Get stored session
//       const stored = localStorage.getItem("session_data");
//       if (!stored) {
//         alert("Please log in to start a new chat.");
//         router.push("/");
//         return;
//       }

//       const session = JSON.parse(stored);

//       //Extract required fields
//       const user_session_id = session.session_id;
//       const user_id = session.user_id;
//       const access_token = session.access_token;

//       //Validate all values exist
//       if (!user_session_id || !user_id || !access_token) {
//         console.warn("Invalid session data:", session);
//         alert("Invalid session data. Please log in again.");
//         router.push("/");
//         return;
//       }

//       console.log("Creating new chat...");

//       // Dispatch Redux action to create new chat
//       const result: any = await dispatch(
//         postNewChat(user_session_id, user_id, access_token, "New Chat")
//       );

//       console.log("🛰️ /new-chat Response:", result);

//       //  Handle errors
//       if (result.type === "POST_NEW_CHAT_FAILURE") {
//         alert("Failed to create new chat. Please try again.");
//         return;
//       }

//       const data = result.payload;

//       //Update session_data for continuity
//       const updatedSession = {
//         ...session,
//         chat_session_id: data.chat_session_id,
//         session_id: data.user_session_id || session.session_id,
//       };
//       localStorage.setItem("session_data", JSON.stringify(updatedSession));

//       //Add new chat to sidebar immediately (no reload)
//       const newChatItem = {
//         session_id: data.chat_session_id,
//         chat_session_id: data.chat_session_id,
//         title: "New Chat",
//         last_activity: new Date().toISOString(),
//         created_at: new Date().toISOString(),
//         user_id: user_id,
//       };
//       dispatch(addNewChatToList(newChatItem));

//       //Redirect to new chat page
//       router.push(`/write-copy/${encodeURIComponent(data.chat_session_id)}`);
//     } catch (err) {
//       console.error("New Chat Error:", err);
//       alert("Something went wrong while creating a new chat.");
//     }
//   };

//   return (
//     <>
//       <div
//         className={`fixed top-5 left-5 bottom-5 flex flex-col w-80 bg-white rounded-3xl shadow-[0_0_1.25rem_0_rgba(0,0,0,0.03)] 
//           max-3xl:w-65 max-lg:top-0 max-lg:left-0 max-lg:bottom-0 
//           max-lg:z-20 max-lg:w-75 max-lg:shadow-2xl max-lg:rounded-none 
//           max-lg:transition-transform max-md:w-full max-md:p-4 ${
//             visible ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
//           }`}
//       >
//         <div className="grow overflow-auto scrollbar-none p-5">
//           {/* Eazr Logo + Title */}
//           <Link
//             className="group relative flex items-center shrink-0 gap-2 h-10 px-3 rounded-xl text-label-sm transition-colors hover:text-blue-500 not-last:mb-2"
//             href="/"
//             onClick={onClickNewChat}
//           >
//             <Image
//               src="/images/logo/eazr_logo.png"
//               alt="Eazr AI Logo"
//               width={120}
//               height={40}
//               className="w-5 h-5 rounded-lg transition-transform duration-300 group-hover:scale-110"
//               style={{ objectFit: "contain" }}
//             />
//             <span className="text-strong-950 transition-colors group-hover:text-blue-500">
//               Chat With Eazr AI 1.0
//             </span>
//           </Link>

//           {/*  New Chat Button */}
//           <button
//             onClick={handleNewChatClick}
//             disabled={chatListLoading}
//             className={`flex items-center gap-2 h-10 mb-4 w-full px-3 rounded-xl font-medium transition-all duration-200 ${
//               chatListLoading
//                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 : "bg-[#00A896]/10 text-[#028678] hover:bg-[#028678]/20 shadow-sm"
//             }`}
//           >
//             <Icon className="fill-[#028678]" name="plus" />
//             <span>{chatListLoading ? "Starting..." : "New Chat"}</span>
//           </button>

          

//           {/* Example: Chat History */}
//           <div className="mb-auto">
//             <div className="mb-2 text-label-xs text-soft-400">Today</div>
//           <SidebarChats />
//           </div>

//           {/* Settings Button */}
//           <div className="mt-7 max-md:mt-4">
//             <Button
//               title="Settings"
//               icon="settings"
//               onClick={() => setOpen(true)}
//             />
//           </div>
//         </div>

       

//         {/* User Section */}
//         <User />
//       </div>

//       {/* Modals */}
//       <ModalSettings open={open} onClose={() => setOpen(false)} />
//       <ModalShare
//         open={openModalShare}
//         onClose={() => setOpenModalShare(false)}
//       />
//       <Modal
//         classWrapper="max-w-100"
//         open={openModalInvite}
//         onClose={() => setOpenModalInvite(false)}
//       >
//         <InvitePeople />
//       </Modal>
//     </>
//   );
// };

// export default Sidebar;


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
import { postNewChat, addNewChatToList } from "@/actions/chatActions";

type Props = {
  visible: boolean;
  onClose: () => void;
  onClickNewChat: () => void;
};

const Sidebar = ({ visible, onClose, onClickNewChat }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { chatListLoading } = useAppSelector((state) => state.chat);

  const [open, setOpen] = useState(false);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [openModalInvite, setOpenModalInvite] = useState(false);

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
        className={`fixed top-5 left-5 bottom-5 flex flex-col w-80 bg-white rounded-3xl shadow-[0_0_1.25rem_0_rgba(0,0,0,0.03)] 
          max-3xl:w-65 max-lg:top-0 max-lg:left-0 max-lg:bottom-0 
          max-lg:z-20 max-lg:w-75 max-lg:shadow-2xl max-lg:rounded-none 
          max-lg:transition-transform max-md:w-[70%] max-md:p-4 ${
            visible ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
      >
        <div className="grow overflow-auto scrollbar-none p-5">
          {/* Mobile Close Button */}
      <div className="flex items-center justify-end mb-4 lg:hidden">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <Icon className="fill-gray-600" name="close" />
            </button>
          </div>

          {/* Eazr Logo + Title */}
          <Link
            className="group relative flex items-center shrink-0 gap-2 h-10 px-3 rounded-xl text-label-sm transition-colors hover:text-blue-500 not-last:mb-2"
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

          {/*  New Chat Button */}
          <button
            onClick={handleNewChatClick}
            disabled={chatListLoading}
            className={`flex items-center gap-2 h-10 mb-4 w-full px-3 rounded-xl font-medium transition-all duration-200 ${
              chatListLoading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#00A896]/10 text-[#028678] hover:bg-[#028678]/20 shadow-sm"
            }`}
          >
            <Icon className="fill-[#028678]" name="plus" />
            <span>{chatListLoading ? "Starting..." : "New Chat"}</span>
          </button>

          

          {/* Example: Chat History */}
          <div className="mb-auto">
          <SidebarChats />
          </div>

          {/* Settings Button */}
          {/* <div className="mt-7 max-md:mt-4">
            <Button
              title="Settings"
              icon="settings"
              onClick={() => setOpen(true)}
            />
          </div> */}

        </div>

       

        {/* User Section */}
        <User />
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
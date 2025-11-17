"use client";

import { useState, useEffect } from "react";
import Image from "@/components/Image";
import { useAppSelector } from "@/store/hook";

type Props = {
  children: React.ReactNode;
};

const Question = ({ children }: Props) => {
  const [userName, setUserName] = useState<string>("User");
  const [profilePic, setProfilePic] = useState<string>("/images/avatar-2.png");

  // Get user profile from Redux store
  const { profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Get basic user data from localStorage
    const stored = localStorage.getItem("session_data");
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUserName(session.user_name || "User");
      } catch (error) {
        console.error("Error parsing session data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Update with full name and profile picture from Redux store
    // Deep comparison on nested profile properties to ensure updates are caught
    if (profile?.profile) {
      const newFullName = profile.profile.full_name;
      const newProfilePic = profile.profile.profile_pic;

      if (newFullName && newFullName !== userName) {
        setUserName(newFullName);
      }

      if (newProfilePic && newProfilePic !== profilePic) {
        setProfilePic(newProfilePic);
      }
    }
  }, [profile, profile?.profile?.full_name, profile?.profile?.profile_pic]);

  return (
    <div className="flex items-start justify-end mb-6">
      {/* Message Content */}
      <div className="mr-3 max-w-[80%] bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-label-sm font-semibold">{userName}</div>
        </div>
        <div className="text-label-sm leading-[1.6]">{children}</div>
      </div>

      {/* Avatar Right */}
      <div className="shrink-0">
        <Image
          className="size-9 rounded-full object-cover ring-2 ring-[#00A896] ring-offset-2 ring-offset-white"
          src={profilePic}
          width={36}
          height={36}
          alt={userName}
        />
      </div>
    </div>
  );
};

export default Question;

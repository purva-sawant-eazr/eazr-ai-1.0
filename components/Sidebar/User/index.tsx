"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { useAppSelector } from "@/store/hook";

const User = () => {
  const [userData, setUserData] = useState({
    user_name: "User",
    user_phone: "",
    full_name: "",
  });
  const [profilePic, setProfilePic] = useState<string>("/images/avatar-1.png");
  const { profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Get user data from localStorage
    const stored = localStorage.getItem("session_data");
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUserData({
          user_name: session.user_name || "User",
          user_phone: session.user_phone || "",
          full_name: "",
        });
      } catch (error) {
        console.error("Error parsing session data:", error);
      }
    }
  }, []);

  // Update profile picture and full name from Redux store
  useEffect(() => {
    if (profile?.profile) {
      if (profile.profile.profile_pic) {
        setProfilePic(profile.profile.profile_pic);
      }
      if (profile.profile.full_name) {
        setUserData((prev) => ({
          ...prev,
          full_name: profile.profile.full_name,
        }));
      }
    }
  }, [profile]);

  return (
    <Link
      className="group flex items-center shrink-0 gap-2 mx-5 pt-3 px-3 pb-5 border-t border-stroke-soft-200"
      href="/profile"
    >
      <div className="">
        <Image
          className="size-10 rounded-full opacity-100"
          src={profilePic}
          width={40}
          height={40}
          alt="User"
        />
      </div>
      <div className="text-label-sm">
        <div className="">{userData.full_name || userData.user_name}</div>
        {!userData.full_name && (
          <div className="text-sub-600">{userData.user_phone}</div>
        )}
      </div>
      <Icon
        className="ml-auto fill-sub-600 -rotate-90 transition-transform group-hover:translate-x-0.5"
        name="chevron"
      />
    </Link>
  );
};

export default User;

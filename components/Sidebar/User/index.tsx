"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { LogOut, LogIn, User as UserIcon } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { clearAuth } from "@/actions/authActions";
import { clearChat } from "@/actions/chatActions";
import { useRouter } from "next/navigation";

type UserProps = {
  isCollapsed?: boolean;
};

const User = ({ isCollapsed = false }: UserProps) => {
  const [userData, setUserData] = useState({
    user_name: "User",
    user_phone: "",
    full_name: "",
  });
  const [profilePic, setProfilePic] = useState<string>("/images/avatar-1.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { profile } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

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
        setLoggedIn(true);
      } catch (error) {
        console.error("Error parsing session data:", error);
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
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

  // Update button position when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.top,
        left: rect.right + 8,
      });
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();

    // Reset Redux store
    dispatch({ type: "RESET_STORE" });
    dispatch(clearAuth());
    dispatch(clearChat());

    // Update local state
    setLoggedIn(false);
    setIsDropdownOpen(false);

    // Full page redirect to ensure complete cleanup
    window.location.href = "/";
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    router.push("/auth/sign-in");
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    router.push("/profile");
  };

  if (isCollapsed) {
    return (
      <>
        <div className="relative flex-none border-t border-stroke-soft-200 p-2">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="group flex items-center justify-center w-full hover:bg-weak-100 rounded-xl transition-all duration-200 p-2"
          >
            <Image
              className="size-9 rounded-full ring-2 ring-transparent group-hover:ring-brand-primary/20 transition-all duration-200"
              src={profilePic}
              width={36}
              height={36}
              alt="User"
            />
          </button>
        </div>

        {/* Dropdown Menu for Collapsed State - Rendered via Portal */}
        {isDropdownOpen &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              ref={dropdownRef}
              className="fixed w-48 mt-15 bg-white border border-stroke-soft-200 rounded-xl shadow-2xl overflow-hidden"
              style={{
                top: `${buttonPosition.top - 120}px`,
                left: `${buttonPosition.left}px`,
                zIndex: 99999,
              }}
            >
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-strong-950 hover:bg-weak-100 transition-all duration-200"
              >
                <UserIcon className="w-4 h-4 text-sub-600" />
                <span className="font-medium">Profile</span>
              </button>

              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-stroke-soft-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-brand-primary hover:bg-brand-secondary/10 transition-all duration-200 border-t border-stroke-soft-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="font-medium">Login</span>
                </button>
              )}
            </div>,
            document.body
          )}
      </>
    );
  }

  return (
    <div
      className="relative flex-none px-3 py-3 border-t border-stroke-soft-200"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="group flex items-center gap-3 w-full p-2 hover:bg-weak-100 rounded-xl transition-all duration-200"
      >
        <Image
          className="size-10 rounded-full ring-2 ring-transparent group-hover:ring-brand-primary/20 transition-all duration-200"
          src={profilePic}
          width={40}
          height={40}
          alt="User"
        />
        <div className="flex-1 text-left min-w-0">
          <div className="text-sm font-semibold text-strong-950 truncate">
            {userData.full_name || userData.user_name}
          </div>
          {!userData.full_name && userData.user_phone && (
            <div className="text-xs text-sub-600 truncate">
              {userData.user_phone}
            </div>
          )}
        </div>
        <Icon
          className={`shrink-0 fill-sub-600 transition-transform duration-200 ${
            isDropdownOpen ? "-rotate-90" : "rotate-90"
          }`}
          name="chevron"
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute bottom-full left-0 right-0 mb-2 mx-3 bg-white border border-stroke-soft-200 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200"
          style={{ zIndex: 99999 }}
        >
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-strong-950 hover:bg-weak-100 transition-all duration-200"
          >
            <UserIcon className="w-4 h-4 text-sub-600" />
            <span className="font-medium">Profile</span>
          </button>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-stroke-soft-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-brand-primary hover:bg-brand-secondary/10 transition-all duration-200 border-t border-stroke-soft-200"
            >
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Login</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default User;

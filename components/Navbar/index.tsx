"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  // Sparkles,
  // Zap,
  // Crown,
  Mail,
  Info,
  Briefcase,
  LogOut,
  User,
} from "lucide-react";
import SignIn from "../../templates/Auth/SignIn";
import SignUp from "../../templates/Auth/SignUp";
import { useAppDispatch } from "@/store/hook";
import { clearAuth } from "@/actions/authActions";

// Add above useState line
interface SessionData {
  user_id?: number;
  user_name?: string;
  user_phone?: string;
  access_token?: string;
  session_id?: string;
  chat_session_id?: string;
  [key: string]: unknown;
}

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<SessionData | null>(null);

  const switchToSignUp = () => {
    setShowSignIn(false);
    setTimeout(() => setShowSignUp(true), 100);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setTimeout(() => setShowSignIn(true), 100);
  };

  // ✅ Check login status from localStorage
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("session_data");
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        setUserData(parsed);
        setLoggedIn(true);
      } else {
        setUserData(null);
        setLoggedIn(false);
      }
    } catch (err) {
      console.error("Error reading session data:", err);
      setLoggedIn(false);
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("session_data");
    dispatch(clearAuth());
    setUserData(null);
    setLoggedIn(false);
    setIsOpen(false);
    // Redirect to home page after logout
    router.push("/");
  };

  return (
    <>
      <nav className="w-full border-b border-[#E5E7EB] bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl blur-md  opacity-30 group-hover:opacity-50 transition-opacity"></div>

              {/* Logo Container */}
              <div className="relative size-10 flex items-center justify-center bg-transparent transition-all duration-300 group-hover:scale-110 overflow-hidden">
                <Image
                  src="/images/logo/eazr_logo.png"
                  alt="Eazr AI Logo"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-[#028678] to-[#00A896] bg-clip-text text-transparent group-hover:from-[#00A896] group-hover:to-[#05665B] transition-all">
                Eazr AI
              </span>
      
            </div>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden lg:flex items-center gap-2">
            {[
              { href: "/about", label: "About ", icon: Info },
              { href: "/contact", label: "Contact", icon: Mail },
              { href: "/career", label: "Careers", icon: Briefcase },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-label-sm font-semibold text-[#4B5563] hover:text-[#028678] transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </span>

               
                <span className="absolute inset-0 bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 rounded-xl"></span>

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#00A896] to-[#028678] group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </Link>
            ))}
          </div> */}

          {/* Desktop Actions */}
          {/* <div className="hidden lg:flex items-center gap-3">
          
            <button
              onClick={() => setShowSignIn(true)}
              className="px-3 py-1.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#028678] hover:bg-[#00A896]/5 active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
            >
              Log in
            </button>

         
            <button
              onClick={() => setShowSignUp(true)}
              className="px-3 py-1.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#028678] hover:bg-[#00A896]/5 active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
            >
              Sign up
            </button>
          </div> */}

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {!loggedIn ? (
              <>
                <button
                  onClick={() => setShowSignIn(true)}
                  className="px-3 py-1.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#028678] hover:bg-[#00A896]/5 active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
                >
                  Log in
                </button>

                <button
                  onClick={() => setShowSignUp(true)}
                  className="px-3 py-1.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#028678] hover:bg-[#00A896]/5 active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
                >
                  Sign up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                  <User className="w-4 h-4 text-[#028678]" />
                  <span className="text-sm font-medium text-[#0E121B]">
                    {userData?.user_name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-[#028678] text-white font-semibold text-sm hover:bg-[#02695D] active:scale-95 transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Login Button - Shows on mobile instead of hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {!loggedIn ? (
              <button
                onClick={() => setShowSignIn(true)}
                className="px-3 py-1.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#028678] hover:bg-[#00A896]/5 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Log in
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-1 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB]">
                  <User className="w-3.5 h-3.5 text-[#028678]" />
                  <span className="text-xs font-medium text-[#0E121B] max-w-[80px] truncate">
                    {userData?.user_name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg bg-[#028678] text-white hover:bg-[#02695D] active:scale-95 transition-all duration-200"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-[#E5E7EB] bg-gradient-to-b from-white to-[#F9FAFB]">
            <div className="flex flex-col px-4 sm:px-6 py-6 gap-2">

              {/* {[
                { href: "/about", label: "About ", icon: Info },
                { href: "/contact", label: "Contact", icon: Mail },
                { href: "/career", label: "Careers", icon: Briefcase },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-label-sm font-semibold text-[#4B5563] hover:text-[#028678] hover:bg-white active:bg-[#F3F4F6] transition-all duration-200 border border-transparent hover:border-[#E5E7EB]"
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))} */}


              {/* <div className="h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent my-2"></div> */}



              {/* Action Buttons */}
              {!loggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setShowSignIn(true);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 text-center rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#00A896] hover:bg-[#00A896]/5 active:scale-[0.98] transition-all duration-200 shadow-sm"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      setShowSignUp(true);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 text-center rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0E121B] font-semibold text-sm hover:border-[#00A896] hover:bg-[#00A896]/5 active:scale-[0.98] transition-all duration-200 shadow-sm"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <User className="w-4 h-4 text-[#028678]" />
                    <span className="text-sm font-medium text-[#0E121B]">
                      {userData?.user_name || "User"}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#028678] text-white font-semibold text-sm hover:bg-[#02695D] active:scale-95 transition-all duration-200 shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <SignIn
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={switchToSignUp}
      />
      <SignUp
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={switchToSignIn}
      />
    </>
  );
};

export default Navbar;

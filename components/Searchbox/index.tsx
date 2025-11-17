"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import { postAsk } from "@/actions/chatActions";
import {
  Paperclip,
  ArrowUpCircle,
  CheckCircle2,
  Zap,
  Image as ImageIcon,
  Mic,
} from "lucide-react";

const SearchBox = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, askResponse, error } = useAppSelector(
    (state) => state.chat
  );

  const { token } = useAppSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (askResponse && !isLoading) {
      console.log("Ask Response Received:", askResponse);
      //Include both the user's query and AI response
      const chatPayload = {
        userQuery: inputValue,
        response:
          askResponse?.data?.data?.response || askResponse?.data?.message,
        chat_session_id: askResponse?.data?.chat_session_id,
        session_id: askResponse?.data?.session_id,
      };

      sessionStorage.setItem("eazrChatResponse", JSON.stringify(chatPayload));

      router.push("/write-copy");
    }
  }, [askResponse, isLoading, router]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    await dispatch(postAsk(inputValue)); 
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sessionStorage.setItem("chatQuery", suggestion);
    router.push("/write-copy");
  };

  const handleAuthRequiredAction = (actionType: string) => {
    if (!token) {
      router.push("/auth/sign-in");
      return;
    }
    // Add your logic here for when user is authenticated
    console.log(`${actionType} clicked - User is authenticated`);
    // TODO: Implement file attachment or image upload logic
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-bg-light via-white to-brand-light px-4 sm:px-6 py-12 max-md:py-8 max-sm:py-0 max-sm:h-screen max-sm:overflow-hidden max-sm:relative">
      {/* Hero Section - Desktop: top, Mobile: center */}
      <div className="text-center mb-12 max-w-4xl max-md:mb-8 max-sm:mb-0 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:flex-1 max-sm:pt-16 max-sm:pb-32">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4 leading-tight max-md:text-3xl max-md:mb-3 max-sm:text-2xl max-sm:mb-2">
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Eazr AI
          </span>
          -Your Intelligent Insurance Partner{" "}
        </h1>

        <p className="text-lg sm:text-xl text-text-tertiary max-w-2xl mx-auto leading-relaxed max-md:text-base max-md:px-2 max-sm:text-base max-sm:px-4">
          Just tell us what you need—AI finds the perfect coverage and brings
          the right insurance plan to life.
        </p>
      </div>

      {/* Main Search Container - Desktop: inline, Mobile: fixed bottom */}
      <div className="w-2xl max-w-4xl max-md:w-full md:mb-8 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:px-4 max-sm:pb-4 max-sm:bg-gradient-to-t max-sm:from-white max-sm:via-white/95 max-sm:to-transparent max-sm:pt-4">
        <div className="relative bg-white rounded-2xl border-2 border-border-light hover:border-brand-secondary/50 focus-within:border-brand-primary transition-all duration-300 shadow-xl hover:shadow-2xl max-md:rounded-xl max-md:border max-sm:rounded-3xl max-sm:shadow-lg max-sm:border">
          {/* Input Field */}
          <div className="flex items-center gap-3 p-5 max-md:p-4 max-sm:p-3 max-sm:py-2 max-sm:gap-2">
            {/* Left action buttons - Mobile only */}
            <div className="hidden max-sm:flex items-center gap-1">
              <button
                onClick={() => handleAuthRequiredAction("Attach")}
                className="flex items-center justify-center w-8 h-8 rounded-full text-text-secondary hover:bg-gray-100 transition-all"
                aria-label="Attach"
              >
                <Paperclip className="w-4 h-4" />
              </button>
            </div>

            <textarea
              placeholder="Ask Eazr to create a web app, design a component, or build anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
              className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-disabled text-base sm:text-lg leading-relaxed font-normal resize-none min-h-[80px] max-h-[200px] max-md:text-sm max-md:min-h-[60px] max-sm:text-sm max-sm:min-h-6 max-sm:max-h-6 max-sm:rows-1 max-sm:leading-6 max-sm:placeholder:text-sm"
            />

            {/* Right action buttons - Mobile only */}
            <div className="hidden max-sm:flex items-center gap-1">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  isRecording
                    ? "bg-red-100 text-red-600"
                    : "text-text-secondary hover:bg-gray-100"
                }`}
                aria-label="Voice"
              >
                <Mic
                  className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`}
                />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                  inputValue.trim()
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90 active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Send"
              >
                <ArrowUpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Bar - Desktop and Tablet only */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2 border-t border-[#F3F4F6] bg-gradient-to-r from-bg-light to-white rounded-b-xl max-md:px-4 max-md:py-1.5 max-md:gap-2 max-md:rounded-b-lg max-sm:hidden">
            {/* Left Actions */}
            <div className="flex items-center gap-2 flex-wrap max-md:gap-1.5 max-sm:gap-1">
              {[
                { icon: Paperclip, label: "Attach" },
                { icon: ImageIcon, label: "Image" },
                // { icon: Globe, label: "Public" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => handleAuthRequiredAction(label)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-border-light bg-white text-text-secondary text-xs font-medium hover:bg-brand-light hover:border-brand-secondary/40 hover:text-brand-primary transition-all duration-200 shadow-sm hover:shadow group max-md:px-1.5 max-md:py-1 max-md:gap-1 max-sm:px-1 max-sm:py-0.5"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform max-md:w-3.5 max-md:h-3.5 max-sm:w-3 max-sm:h-3" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg font-semibold text- transition-all duration-200 shadow-lg hover:shadow-xl max-md:px-2 max-md:py-1 max-md:gap-1 max-md:text-xs max-sm:px-1.5 max-sm:py-0.5 max-sm:text-[10px] ${
                inputValue.trim()
                  ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:from-brand-dark hover:to-brand-primary active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Send"
            >
              <span className="max-md:hidden">
                {isLoading ? "Eazr AI is thinking..." : "Send"}
              </span>
              <span className="hidden max-md:inline">
                {isLoading ? "Thinking..." : "Send"}
              </span>
              <ArrowUpCircle className="w-5 h-5 max-md:w-4 max-md:h-4 max-sm:w-3.5 max-sm:h-3.5" />
            </button>
          </div>
        </div>

        {/*  AI Response */}
        {askResponse && (
          <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-xl text-sm text-green-800 max-md:mt-3 max-md:p-3 max-md:rounded-lg max-md:text-xs max-sm:mt-2 max-sm:p-2 max-sm:text-[10px]">
            <p className="font-semibold">AI Response:</p>
            <p>{askResponse?.data?.response}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-xl text-sm text-red-700 max-md:mt-3 max-md:p-3 max-md:rounded-lg max-md:text-xs max-sm:mt-2 max-sm:p-2 max-sm:text-[10px]">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Features Section - Hidden on mobile */}
      <div className="w-full max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-md:mt-10 max-md:gap-4 max-sm:hidden">
        {/* Use Credits Card */}
        <div className="bg-white border border-border-light rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 max-md:rounded-xl max-md:p-6 max-sm:rounded-lg max-sm:p-4">
          <div className="flex items-center gap-3 mb-6 max-md:gap-2 max-md:mb-4 max-sm:gap-1.5 max-sm:mb-3">
            <div className="flex items-center justify-center size-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl shadow-lg max-md:size-10 max-md:rounded-lg max-sm:size-8 max-sm:rounded-md">
              <Zap className="w-6 h-6 text-white max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary max-md:text-xl max-sm:text-lg">
              Use Eazr Credits
            </h2>
          </div>

          <ul className="flex flex-col gap-4 text-text-secondary text-label-sm max-md:gap-3 max-sm:gap-2">
            {[
              "Instantly redeem credits for AI-powered tools and insights.",
              "Unlock premium AI features with one click.",
              "Track your usage and rewards in real-time.",
              "Access exclusive updates and early product releases.",
              "Get faster AI responses using your Eazr balance.",
            ].map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-3 group max-md:gap-2 max-sm:gap-1.5"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-primary mt-[2px] group-hover:scale-110 transition-transform flex-shrink-0 max-md:w-4 max-md:h-4 max-sm:w-3.5 max-sm:h-3.5" />
                <span className="group-hover:text-text-primary transition-colors max-md:text-xs max-sm:text-[10px]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* QR Code Card */}
        <div className="bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 border border-border-light rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center max-md:rounded-xl max-md:p-6 max-sm:rounded-lg max-sm:p-4">
          <div className="mb-6 max-md:mb-4 max-sm:mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 border border-border-light shadow-sm max-md:px-3 max-md:py-1.5 max-md:gap-1.5 max-md:mb-3 max-sm:px-2 max-sm:py-1 max-sm:gap-1 max-sm:mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse max-md:w-1.5 max-md:h-1.5 max-sm:w-1 max-sm:h-1"></div>
              <span className="text-sm font-semibold text-text-primary max-md:text-xs max-sm:text-[10px]">
                Scan Ready
              </span>
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2 max-md:text-lg max-md:mb-1.5 max-sm:text-base max-sm:mb-1">
              Continue on Mobile
            </h3>
            <p className="text-sm text-text-tertiary max-md:text-xs max-sm:text-[10px]">
              Scan the QR code to Download App
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 rounded-xl group-hover:opacity-30 transition-opacity"></div>
            <div className="relative w-[180px] h-[180px] rounded-xl bg-white  group-hover:scale-105 transition-transform max-md:w-[140px] max-md:h-[140px] max-md:rounded-lg max-sm:w-[100px] max-sm:h-[100px] max-sm:rounded-md">
              <Image
                src="/images/logo/qr.png"
                alt="QR Code"
                width={180}
                height={180}
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-text-tertiary max-md:mt-4 max-md:gap-1.5 max-md:text-xs max-sm:mt-3 max-sm:gap-1 max-sm:text-[10px]">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E5E7EB] max-md:w-6 max-sm:w-4"></div>
            <span>Open camera & scan</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E5E7EB] max-md:w-6 max-sm:w-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

"use client";

import { useState, useEffect } from "react";
import { X, Phone, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { sendOtp } from "@/actions/authActions";
import VerifyOtpPopup from "../VerifyOtpPopup";

interface SignInProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSwitchToSignUp?: () => void;
}

const SignIn = ({ isOpen = true, onClose, onSwitchToSignUp }: SignInProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, otpSent, error } = useAppSelector((state) => state.auth);
  const [phone, setPhone] = useState("");

  // Default close handler that navigates back to home
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  // useEffect(() => {
  //   if (otpSent && phone) {
  //     router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
  //     onClose();
  //   }
  // }, [otpSent, phone, router, onClose]);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  useEffect(() => {
    if (otpSent && phone) {
      setShowVerifyPopup(true);
    }
  }, [otpSent, phone]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) {
      alert("Enter valid 10-digit phone number");
      return;
    }
    await dispatch(sendOtp(phone));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-2xl w-full max-w-md relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X />
        </button>

        <div className="text-center mb-8">
          <div className="bg-[#0E121B] text-white size-12 mx-auto rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="text-h5 font-semibold mb-1">Sign In with Phone</h2>
          <p className="text-label-sm text-gray-500">
            Enter your phone number to get OTP
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-5">
          <div>
            <label className="text-label-sm font-medium mb-2 block">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone"
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0E121B]"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-label-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#0E121B] text-white font-semibold"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-label-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="text-text-primary font-medium"
          >
            Sign up
          </button>
        </div>
      </div>

      {showVerifyPopup && (
        <VerifyOtpPopup
          isOpen={showVerifyPopup}
          phone={phone}
          onClose={() => setShowVerifyPopup(false)}
          onSuccess={(data) => {
            console.log("Login success:", data);
            router.push("/write-copy"); 
          }}
        />
      )}
    </div>
  );
};

export default SignIn;

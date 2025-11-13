// "use client";

// import { useEffect, useState } from "react";
// import { X, ShieldCheck } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { verifyOtp } from "@/actions/authActions";

// interface VerifyOtpPopupProps {
//   isOpen: boolean;
//   phone: string;
//   onClose: () => void;
//   onSuccess?: (data: any) => void;
// }

// const VerifyOtpPopup = ({
//   isOpen,
//   phone,
//   onClose,
//   onSuccess,
// }: VerifyOtpPopupProps) => {
//   const dispatch = useAppDispatch();
//   const { isLoading, error } = useAppSelector((state) => state.auth);
//   const [otp, setOtp] = useState("");

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (otp.trim().length !== 4) {
//       alert("Please enter a valid 4-digit OTP");
//       return;
//     }

//     const result = await dispatch(verifyOtp(phone, otp));

//     if (result.success) {
//       // ✅ Store session data locally
//       const data = result.data;
//       localStorage.setItem(
//         "session_data",
//         JSON.stringify({
//           session_id: data.session_id,
//           chat_session_id: data.chat_session_id,
//           user_phone: data.user_phone,
//           user_name: data.user_name,
//           access_token: data.access_token,
//           user_id: data.user_id,
//         })
//       );

//       // Also store in Redux
//       dispatch({ type: "VERIFY_OTP_SUCCESS", payload: data });

//       if (onSuccess) onSuccess(data);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-8 rounded-2xl w-full max-w-md relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500"
//         >
//           <X />
//         </button>

//         <div className="text-center mb-8">
//           <div className="bg-[#0E121B] text-white size-12 mx-auto rounded-xl flex items-center justify-center mb-4">
//             <ShieldCheck className="size-6" />
//           </div>
//           <h2 className="text-2xl font-semibold mb-1">Verify OTP</h2>
//           <p className="text-sm text-gray-500">
//             Enter the 4-digit OTP sent to <b>{phone}</b>
//           </p>
//         </div>

//         <form onSubmit={handleVerify} className="space-y-5">
//           <div className="flex justify-center gap-3">
//             {[...Array(4)].map((_, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength={1}
//                 inputMode="numeric"
//                 value={otp[i] || ""}
//                 onChange={(e) => {
//                   const val = e.target.value.replace(/\D/g, "").slice(0, 1);
//                   const newOtp = otp.split("");
//                   newOtp[i] = val;
//                   setOtp(newOtp.join(""));
//                 }}
//                 className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-[#0E121B] focus:border-[#0E121B] outline-none"
//               />
//             ))}
//           </div>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             disabled={isLoading || otp.length < 4}
//             className={`w-full py-3 rounded-xl text-white font-semibold transition ${
//               otp.length === 4
//                 ? "bg-[#0E121B] hover:bg-[#1E2230]"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-500">
//           Didn’t get the code?{" "}
//           <button className="text-[#0E121B] font-medium">Resend</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtpPopup;



// // this is store in redux so it is globally available to use.
// // const { user, isAuthenticated } = useAppSelector((state) => state.auth);


"use client";

import { useState, useRef } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { verifyOtp } from "@/actions/authActions";

interface VerifyOtpPopupProps {
  isOpen: boolean;
  phone: string;
  onClose: () => void;
  onSuccess?: (data: any) => void;
}

const VerifyOtpPopup = ({
  isOpen,
  phone,
  onClose,
  onSuccess,
}: VerifyOtpPopupProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  // ✅ Refs for auto-focusing inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // ✅ Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // ✅ Move to previous input when deleting empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 4) {
      alert("Please enter a valid 4-digit OTP");
      return;
    }

    const result = await dispatch(verifyOtp(phone, code));

    if (result.success) {
      const data = result.data;
      localStorage.setItem(
        "session_data",
        JSON.stringify({
          session_id: data.session_id,
          chat_session_id: data.chat_session_id,
          user_phone: data.user_phone,
          user_name: data.user_name,
          access_token: data.access_token,
          user_id: data.user_id,
        })
      );

      dispatch({ type: "VERIFY_OTP_SUCCESS", payload: data });

      if (onSuccess) onSuccess(data);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-2xl w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X />
        </button>

        <div className="text-center mb-8">
          <div className="bg-[#0E121B] text-white size-12 mx-auto rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="text-2xl font-semibold mb-1">Verify OTP</h2>
          <p className="text-sm text-gray-500">
            Enter the 4-digit OTP sent to <b>{phone}</b>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={otp[i]}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-[#0E121B] focus:border-[#0E121B] outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || otp.join("").length < 4}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              otp.join("").length === 4
                ? "bg-[#0E121B] hover:bg-[#1E2230]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Didn’t get the code?{" "}
          <button className="text-[#0E121B] font-medium">Resend</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPopup;

// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   UserPlus,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   X,
//   User,
// } from "lucide-react";

// interface SignUpFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToSignIn?: () => void;
// }

// const SignUp = ({
//   isOpen,
//   onClose,
//   onSwitchToSignIn,
// }: SignUpFormProps) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     if (!formData.agreeToTerms) {
//       alert("Please agree to the terms and conditions");
//       return;
//     }

//     console.log("Sign up:", formData);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-[#0E121B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 size-8 rounded-lg hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center transition-all duration-200 z-10"
//           aria-label="Close"
//         >
//           <X className="size-5 text-gray-500" />
//         </button>

//         {/* Header */}
//         <div className="mb-8">
//           <div className="size-12 rounded-xl bg-gradient-to-br from-[#0E121B] to-[#1a1f2e] flex items-center justify-center shadow-lg mb-4">
//             <UserPlus className="size-6 text-white" />
//           </div>
//           <h2 className="text-2xl font-semibold text-text-primary mb-1">
//             Create Account
//           </h2>
//           <p className="text-sm text-gray-500">
//             Sign up to get started with YourBrand
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name Input */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-text-primary mb-2"
//             >
//               Full Name
//             </label>
//             <div className="relative">
//               <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 required
//                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E121B] focus:border-transparent transition-all duration-200"
//               />
//             </div>
//           </div>

//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="signup-email"
//               className="block text-sm font-medium text-text-primary mb-2"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
//               <input
//                 id="signup-email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 required
//                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E121B] focus:border-transparent transition-all duration-200"
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="signup-password"
//               className="block text-sm font-medium text-text-primary mb-2"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
//               <input
//                 id="signup-password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//                 required
//                 minLength={8}
//                 className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E121B] focus:border-transparent transition-all duration-200"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-primary transition-colors"
//               >
//                 {showPassword ? (
//                   <EyeOff className="size-5" />
//                 ) : (
//                   <Eye className="size-5" />
//                 )}
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               Must be at least 8 characters
//             </p>
//           </div>

//           {/* Confirm Password Input */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-text-primary mb-2"
//             >
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm your password"
//                 required
//                 className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E121B] focus:border-transparent transition-all duration-200"
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowConfirmPassword(!showConfirmPassword)
//                 }
//                 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-primary transition-colors"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="size-5" />
//                 ) : (
//                   <Eye className="size-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Terms and Conditions */}
//           <div>
//             <label className="flex items-start gap-2 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 name="agreeToTerms"
//                 checked={formData.agreeToTerms}
//                 onChange={handleChange}
//                 required
//                 className="size-4 rounded border-gray-300 text-text-primary focus:ring-2 focus:ring-[#0E121B] cursor-pointer mt-0.5"
//               />
//               <span className="text-sm text-gray-600 group-hover:text-text-primary transition-colors">
//                 I agree to the{" "}
//                 <Link
//                   href="/terms"
//                   className="text-text-primary hover:text-[#1a1f2e] font-medium"
//                 >
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link
//                   href="/privacy"
//                   className="text-text-primary hover:text-[#1a1f2e] font-medium"
//                 >
//                   Privacy Policy
//                 </Link>
//               </span>
//             </label>
//           </div>

//           {/* Sign Up Button */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl bg-[#0E121B] text-white font-semibold hover:bg-[#1a1f2e] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all duration-200"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <button
//             onClick={onSwitchToSignIn}
//             className="text-text-primary hover:text-[#1a1f2e] font-medium transition-colors"
//           >
//             Sign in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// components/SignUpForm/index.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { X, Phone, Shield } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "../../../store/hook";
// import { sendOtp, verifyOtp } from "@/actions/authActions";

// interface SignUpFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToSignIn?: () => void;
// }

// const SignUp = ({ isOpen, onClose, onSwitchToSignIn }: SignUpFormProps) => {
//   const dispatch = useAppDispatch();
//   const { isLoading, otpSent, token, error } = useAppSelector(
//     (state) => state.chat
//   );

//   const [formData, setFormData] = useState({
//     phone: "",
//     otp: "",
//   });

//   const [timer, setTimer] = useState(0);

//   // Countdown for resend
//   useEffect(() => {
//     if (otpSent && timer === 0) setTimer(30);
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [otpSent, timer]);

//   // Close modal after successful registration
//   useEffect(() => {
//     if (token) {
//       onClose();
//       // Optionally: save token or redirect to profile setup
//       // localStorage.setItem("access_token", token);
//     }
//   }, [token, onClose]);

//   const handleSendOtp = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.phone.match(/^\d{10}$/)) {
//       alert("Enter a valid 10-digit phone number");
//       return;
//     }
//     dispatch(sendOtp(formData.phone));
//   };

//   const handleVerifyOtp = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.otp) {
//       alert("Please enter OTP");
//       return;
//     }
//     dispatch(verifyOtp(formData.phone, formData.otp));
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-[#0E121B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all"
//           aria-label="Close"
//         >
//           <X className="size-5 text-gray-500" />
//         </button>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="size-12 rounded-xl bg-gradient-to-br from-[#0E121B] to-[#1a1f2e] flex items-center justify-center shadow-lg mb-4 mx-auto">
//             <Shield className="size-6 text-white" />
//           </div>
//           <h2 className="text-2xl font-semibold text-text-primary mb-1">
//             Create Account
//           </h2>
//           <p className="text-sm text-gray-500">
//             Sign up securely with your phone number
//           </p>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
//           className="space-y-5"
//         >
//           {/* Phone Number Input */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block text-sm font-medium text-text-primary mb-2"
//             >
//               Phone Number
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//                 placeholder="Enter your phone number"
//                 required
//                 disabled={otpSent}
//                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-[#0E121B] transition-all"
//               />
//             </div>
//           </div>

//           {/* OTP Input */}
//           {otpSent && (
//             <div>
//               <label
//                 htmlFor="otp"
//                 className="block text-sm font-medium text-text-primary mb-2"
//               >
//                 Enter OTP
//               </label>
//               <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 value={formData.otp}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, otp: e.target.value }))
//                 }
//                 placeholder="Enter the OTP"
//                 maxLength={6}
//                 required
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-[#0E121B]"
//               />
//               <div className="text-xs text-gray-500 mt-2 text-right">
//                 {timer > 0 ? (
//                   <span>Resend in {timer}s</span>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       dispatch(sendOtp(formData.phone));
//                       setTimer(30);
//                     }}
//                     className="text-text-primary underline font-medium"
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 rounded-xl bg-[#0E121B] text-white font-semibold hover:bg-[#1a1f2e] active:scale-[0.98] shadow-lg transition-all"
//           >
//             {isLoading
//               ? "Processing..."
//               : otpSent
//               ? "Verify OTP"
//               : "Send OTP"}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <button
//             onClick={onSwitchToSignIn}
//             className="text-text-primary hover:text-[#1a1f2e] font-medium transition-colors"
//           >
//             Sign in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

"use client";

import { useState, useEffect } from "react";
import { X, Phone, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { sendOtp } from "@/actions/authActions";

interface SignUpProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUp = ({ isOpen = true, onClose = () => {}, onSwitchToSignIn }: SignUpProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, otpSent, error } = useAppSelector((state) => state.auth);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (otpSent && phone) {
      router.push(`/verify-otp`);
      onClose();
    }
  }, [otpSent, phone, router, onClose]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) return alert("Enter valid phone");
    await dispatch(sendOtp(phone));
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
            <Shield className="size-6" />
          </div>
          <h2 className="text-2xl font-semibold mb-1">Create Account</h2>
          <p className="text-sm text-gray-500">
            Sign up with your phone number
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">
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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#0E121B] text-white font-semibold"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={onSwitchToSignIn}
            className="text-text-primary font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

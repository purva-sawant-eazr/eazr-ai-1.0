import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  CLEAR_AUTH,
} from "../constants/actionTypes";
import { AppDispatch } from "../store/store";

//  Use env variable for direct API in production
const baseURL =process.env.NEXT_PUBLIC_BASE_URL || "https://eazr.ai.eazr.in";

//  Helper to detect if running locally
const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";

//  Send OTP
export const sendOtp = (phone: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: SEND_OTP_REQUEST });
  try {
    //  Use local proxy in dev, real API in production
    const endpoint = isLocal ? "/api/send-otp" : `${baseURL}/send-otp`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    if (!response.ok) throw new Error("Failed to send OTP");

    const data = await response.json();
    dispatch({ type: SEND_OTP_SUCCESS, payload: { ...data, phone } });
    return { success: true, data };
  } catch (error: any) {
    console.error("Send OTP Error:", error);
    dispatch({ type: SEND_OTP_FAILURE, payload: error.message });
    return { success: false, error: error.message };
  }
};

//  Verify OTP
export const verifyOtp =
  (phone: string, otp: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    try {
      //  Use local proxy in dev, real API in production
      const endpoint = isLocal ? "/api/verify-otp" : `${baseURL}/verify-otp`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) throw new Error("Failed to verify OTP");

      const data = await response.json();

      //  Save to localStorage
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

      dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
      return { success: true, data };
    } catch (error: any) {
      console.error("Verify OTP Error:", error);
      dispatch({ type: VERIFY_OTP_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

//  Logout / Clear
export const clearAuth = () => {
  localStorage.removeItem("session_data");
  return { type: CLEAR_AUTH };
};

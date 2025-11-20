// src/reducers/authReducer.ts
import {
  CLEAR_AUTH,
  SEND_OTP_FAILURE,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../constants/actionTypes";

export interface AuthState {
  phone: string;
  isLoading: boolean;
  otpSent: boolean;
  token: string | null;
  user: { id: number | null; phone: string | null; name: string | null } | null;
  sessionId: string | null;
  chatSessionId: string | null;
  profileCreated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  phone: "",
  isLoading: false,
  otpSent: false,
  token: null,
  user: null,
  sessionId: null,
  chatSessionId: null,
  profileCreated: false,
  error: null,
};

export default function authReducer(
  state = initialState,
  action: { type: string; payload?: any }
): AuthState {
  switch (action.type) {
    case SEND_OTP_REQUEST:
    case VERIFY_OTP_REQUEST:
      return { ...state, isLoading: true, error: null };

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpSent: true,
        phone: action.payload.phone ?? "",
      };

    case SEND_OTP_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpSent: false,
        token: action.payload.access_token ?? null,
        user: {
          id: action.payload.user_id ?? null,
          phone: action.payload.user_phone ?? null,
          name: action.payload.user_name ?? "User",
        },
        sessionId: action.payload.session_id ?? null,
        chatSessionId: action.payload.chat_session_id ?? null,
        profileCreated: action.payload.profile_created ?? false,
        error: null,
      };

    case VERIFY_OTP_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case CLEAR_AUTH:
      return initialState;

    default:
      return state;
  }
}

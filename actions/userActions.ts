import {
  SET_USER,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  PATCH_USER_PROFILE_REQUEST,
  PATCH_USER_PROFILE_SUCCESS,
  PATCH_USER_PROFILE_FAILURE,
  POST_USER_PROFILE_REQUEST,
  POST_USER_PROFILE_SUCCESS,
  POST_USER_PROFILE_FAILURE,
  RESET_UPDATE_SUCCESS,
} from "../constants/actionTypes";
import { AppDispatch } from "../store/store";

export const setUser = (user: any) => ({
  type: SET_USER,
  payload: user,
});

export const resetUpdateSuccess = () => ({
  type: RESET_UPDATE_SUCCESS,
});

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://eazr.ai.eazr.in";

const isLocal =
  typeof window !== "undefined" && window.location.hostname === "localhost";

// Get User Profile
export const getUserProfile =
  (session_id: string, access_token: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    try {
      const endpoint = isLocal
        ? `/api/user-profile/${session_id}`
        : `${baseURL}/user-profile/${session_id}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user profile");

      const data = await response.json();
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
      return { success: true, data };
    } catch (error: any) {
      console.error("Get User Profile Error:", error);
      dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

// Update User Profile (PATCH)
export const updateUserProfile =
  (session_id: string, access_token: string, profileData: any) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: PATCH_USER_PROFILE_REQUEST });
    try {
      const endpoint = isLocal
        ? `/api/user-profile/${session_id}`
        : `${baseURL}/user-profile/${session_id}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) throw new Error("Failed to update user profile");

      const data = await response.json();
      dispatch({ type: PATCH_USER_PROFILE_SUCCESS, payload: data });
      return { success: true, data };
    } catch (error: any) {
      console.error("Update User Profile Error:", error);
      dispatch({ type: PATCH_USER_PROFILE_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

// Update User Profile With Picture (POST)
export const updateUserProfileWithPicture =
  (session_id: string, user_id: number, access_token: string, formData: FormData) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: POST_USER_PROFILE_REQUEST });
    try {
      const endpoint = isLocal
        ? `/api/update-user-profile-with-picture`
        : `${baseURL}/update-user-profile-with-picture`;

      // Append session_id and user_id to formData
      formData.append("session_id", session_id);
      formData.append("user_id", user_id.toString());

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          // DO NOT set Content-Type - browser will set it with boundary for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update user profile with picture");

      const data = await response.json();
      dispatch({ type: POST_USER_PROFILE_SUCCESS, payload: data });
      return { success: true, data };
    } catch (error: any) {
      console.error("Update User Profile With Picture Error:", error);
      dispatch({ type: POST_USER_PROFILE_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };
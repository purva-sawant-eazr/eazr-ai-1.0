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

interface UserState {
  profile: any;
  profileLoading: boolean;
  profileError: string | null;
  updateLoading: boolean;
  updateError: string | null;
  updateSuccess: boolean;
}

const initialState: UserState = {
  profile: null,
  profileLoading: false,
  profileError: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };

    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
        profileError: null,
        updateSuccess: false,
        updateError: null,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false,
        profileError: null,
      };

    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        profileLoading: false,
        profileError: action.payload,
      };

    case PATCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
        updateSuccess: false,
      };

    case PATCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        updateLoading: false,
        updateError: null,
        updateSuccess: true,
      };

    case PATCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
        updateSuccess: false,
      };

    case POST_USER_PROFILE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
        updateSuccess: false,
      };

    case POST_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        updateLoading: false,
        updateError: null,
        updateSuccess: true,
      };

    case POST_USER_PROFILE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
        updateSuccess: false,
      };

    case RESET_UPDATE_SUCCESS:
      return {
        ...state,
        updateSuccess: false,
        updateError: null,
      };

    default:
      return state;
  }
}

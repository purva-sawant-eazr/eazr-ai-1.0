import {
  SET_USER,
} from "../constants/actionTypes";

const initialState = { count: 0 };

export default function userReducer(state = initialState, action:any) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

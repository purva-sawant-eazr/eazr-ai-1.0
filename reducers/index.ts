import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

export default combineReducers({
  counter: counterReducer,
  user: userReducer,
  auth: authReducer,
});

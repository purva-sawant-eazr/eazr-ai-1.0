import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import counterReducer from "../reducers/counterReducer";
import userReducer from "../reducers/userReducer";
import chatReducer from "@/reducers/chatReducer";

// Combine reducers
const appReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
});

// Root reducer with RESET_STORE support
const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // reset entire store
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

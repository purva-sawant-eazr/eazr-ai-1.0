import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import counterReducer from "../reducers/counterReducer";
import userReducer from "../reducers/userReducer";
import chatReducer from "@/reducers/chatReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    chat: chatReducer
  },
});

//  Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

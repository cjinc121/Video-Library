import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import authReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: { video: videoReducer, auth: authReducer },
});

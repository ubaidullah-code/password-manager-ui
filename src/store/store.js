import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@/store/auth-slice/AuthSlice"
import passwordSlice from "@/store/password-manager-Slice/index"

export const store = configureStore({
  reducer: {
        auth: AuthSlice,
        passwordManager : passwordSlice,
  },
});
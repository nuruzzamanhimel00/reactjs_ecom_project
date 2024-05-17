import { configureStore } from "@reduxjs/toolkit";

import layoutSlice from "./backend/layout-slice.js";
import authSlice from "./backend/auth-slice.js";

export const store = configureStore({
  reducer: {
    adminLayout: layoutSlice,
    auth: authSlice,
  },
});

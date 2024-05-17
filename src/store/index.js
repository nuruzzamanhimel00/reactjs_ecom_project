import { configureStore } from "@reduxjs/toolkit";

import layoutSlice from "./backend/layout-slice.js";

export const store = configureStore({
  reducer: {
    adminLayout: layoutSlice,
  },
});

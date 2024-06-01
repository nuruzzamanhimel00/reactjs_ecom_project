import { createSlice } from "@reduxjs/toolkit";

const allReducers = {
  addToast: (state, action) => {
    console.log("addToast");
    state.push(action.payload);
  },
  removeToast: (state, action) => {
    console.log("removeToast");
    return state.filter((toast) => toast.id !== action.payload);
  },
};
const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: allReducers,
});

export const authActions = toastSlice.actions;
export default toastSlice.reducer;

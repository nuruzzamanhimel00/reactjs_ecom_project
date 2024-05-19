import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: true,
  isLoading: false,
  toastNotification: {
    type: "",
    summary: "",
    detail: "",
  },
};
const allReducers = {
  resetToastNotification(state) {
    let newData = {
      type: "",
      summary: "",
      detail: "",
    };
    state.toastNotification = newData;
  },
  setToastNotification(state, action) {
    let newData = {
      type: action.payload.type ? action.payload.type : "success",
      summary: action.payload.summary ? action.payload.summary : "",
      detail: action.payload.detail ? action.payload.detail : "",
    };
    state.toastNotification = newData;
  },
  toggleMenuBar(state) {
    state.isMenuOpen = !state.isMenuOpen;
  },
  spinnerLoading(state, action) {
    state.isLoading = action.payload;
  },
};
const layoutSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: allReducers,
});

export const cartActions = layoutSlice.actions;
export default layoutSlice.reducer;

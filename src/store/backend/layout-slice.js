import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: true,
  isLoading: false,
};
const allReducers = {
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

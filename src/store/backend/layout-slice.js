import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: true,
};
const allReducers = {
  toggleMenuBar(state) {
    state.isMenuOpen = !state.isMenuOpen;
  },
};
const layoutSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: allReducers,
});

export const cartActions = layoutSlice.actions;
export default layoutSlice.reducer;

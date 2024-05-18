import { createSlice } from "@reduxjs/toolkit";

function setSessionToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken).replace(/"/g, ""));
}

const initialState = {
  user: {},
  token: null,
  isAuth: false,
};

const allReducers = {
  setLoginData(state, action) {
    // console.log("setLoginData", action.payload);
    setSessionToken(action.payload.token);
    state.isAuth = true;
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: allReducers,
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

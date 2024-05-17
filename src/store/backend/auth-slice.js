import { createSlice } from "@reduxjs/toolkit";
import { useLoginUrl } from "../../helpers/apiRoutes/index.js";
import { makeLogin } from "../../services/backend/AuthService.js";

const initialState = {
  user: {},
  token: null,
  isAuth: false,
};
const allReducers = {
  login(state, action) {
    let response = makeLogin({
      url: useLoginUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: action.payload.email,
        password: action.payload.password,
      },
    });
    console.log("login", action, response);
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: allReducers,
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

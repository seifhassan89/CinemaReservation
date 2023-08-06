import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin:
      JSON.parse(localStorage.getItem("admin")) ||
      JSON.parse(sessionStorage.getItem("admin")) ||
      {},
  },
  reducers: {
    loginRequest: () => {},
    loginResponse: (state, action) => {
      state.admin = action.payload;
    },
    logoutRequest: () => {},
    logoutResponse: (state) => {
      state.admin = {};
    },
  },
});

export const { loginRequest, loginResponse, logoutRequest, logoutResponse } =
  authSlice.actions;
export default authSlice.reducer;

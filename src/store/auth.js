import { createSlice } from "@reduxjs/toolkit";

const initialToken = JSON.parse(localStorage.getItem("token"));
const initialState = { token: initialToken, isLoggedIn: !!initialToken };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

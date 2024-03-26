import { createSlice } from "@reduxjs/toolkit";

const initialToken = JSON.parse(localStorage.getItem("token"));
const initialEmail = JSON.parse(localStorage.getItem("email"));
const initialState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  email: initialEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("email", JSON.stringify(action.payload.email));
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

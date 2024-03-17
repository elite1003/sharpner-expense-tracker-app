import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  fullName: "",
  profilePhotoUrl: "",
  email: "",
  emailVerified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action) {
      return action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

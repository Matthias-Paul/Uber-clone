import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.loginUser = action.payload;
    },
    logOutSuccess: (state) => {
      state.loginUser = null;
    },
  },
});
// destructuring declaration
export const { signInSuccess, logOutSuccess } = authSlice.actions;

export default authSlice.reducer;

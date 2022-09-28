import { createSlice } from "@reduxjs/toolkit";
// userSlice
export const userSlice = createSlice({
  name: "user",
  // initial state
  initialState: {
    user: null,
  },

  reducers: {
    // updating the state with reducer
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, reloadUserData } = userSlice.actions;

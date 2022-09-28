// creating slice for alert
import { createSlice } from "@reduxjs/toolkit";

// alertSlice
export const alertSlice = createSlice({
  name: "alert",
  // initial state
  initialState: {
    loading: false,
  },
  // reducers
  reducers: {
    // show loading when loading
    showLoading: (state) => {
      state.loading = true;
    },
    // hide loading when the work is done
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertSlice.actions;
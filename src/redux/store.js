import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertSlice";
import { userSlice } from "./userSlice";

// root reducer
const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  user : userSlice.reducer,
});

// store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
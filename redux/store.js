"use client";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: false,
  reducers: {
    toggleDarkMode: (state) => !state,
  },
});

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default store;

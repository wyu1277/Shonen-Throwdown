import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle(state, action) {
      return (state = action.payload);
    },
  },
  extraReducers: {},
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice.reducer;

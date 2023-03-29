import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setLoading(state, action) {
      return (state = action.payload);
      console.log(action.payload);
    },
  },
});

export const loadActions = loadSlice.actions;

export default loadSlice.reducer;

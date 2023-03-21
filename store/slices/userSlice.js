import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";

const initialState = {};

export const searchUser = createAsyncThunk("search4user", async (hope) => {
  try {
    console.log("HOPE STRING");
    console.log(hope);
    const user = await supabase.from("users").select().eq("email", hope);
    console.log(user);
    const data = user ? user : false;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      console.log(current(state));
      console.log("extra reducers string");
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";

const initialState = {};

export const searchUser = createAsyncThunk("search4user", async (hope) => {
  try {
    console.log(hope, "hope");
    const user = await supabase.from("users").select().eq("id", hope).single();
    console.log(user.data);
    return user.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk("updateUser", async (hope) => {
  try {
    const updatedUser = await supabase
      .from("users")
      .update(hope)
      .eq("id", hope.id);
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        console.log("Fulfilled Search");
        // console.log(action.payload, "ACTION PAYLOAD");
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        console.log("Initiating update user");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(" Update User fulfilled");
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

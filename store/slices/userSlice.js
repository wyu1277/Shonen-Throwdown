import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";

const initialState = {};

export const searchUser = createAsyncThunk("search4user", async (hope) => {
  try {
    // console.log(hope, "hope");
    const user = await supabase.from("users").select().eq("id", hope);
    // console.log(user);

    const data = user.data;
    // console.log(data);
    return data[0];
  } catch (error) {
    console.log(error, "Error Search");
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
        state.loading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        console.log("Initiating update user");
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(" Update User fulfilled");
        state.loading = false;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";

const initialState = {};

export const searchUser = createAsyncThunk("search4user", async (hope) => {
  try {
    const user = await supabase.from("users").select().eq("email", hope);
    if (user.data.length === 0) {
      await supabase.from("users").insert([
        {
          email: hope,
        },
      ]);
    }

    const data = user ? user : false;
    return data;
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
      .addCase(searchUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
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

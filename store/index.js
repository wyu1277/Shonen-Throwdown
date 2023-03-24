import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import toggleReducer from "./slices/toggleSlice";

const store = configureStore({
  reducer: { user: userReducer, toggle: toggleReducer },
});

export default store;

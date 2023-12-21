import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/PostSlice";
import userReducer from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
});

export default store;

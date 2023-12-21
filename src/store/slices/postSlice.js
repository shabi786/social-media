import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts: (state, action) => {
      return action.payload.posts;
    },
    toggleLike: (state, action) => {
      const post = state.find((post) => post.id === action.payload.postId);
      if (post) {
        post.likes += post.liked ? -1 : 1;
        post.liked = !post.liked;
      }
    },
    addComment: (state, action) => {
      const post = state.find((post) => post.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
  },
});

export const { setPosts, toggleLike, addComment } = postSlice.actions;
export default postSlice.reducer;

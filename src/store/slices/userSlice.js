import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    setUser: (state, action) => {
      const newUser = action.payload.user;
      const existingUserIndex = state.findIndex(
        (user) => user.id === newUser.id
      );
      if (existingUserIndex !== -1) {
        state[existingUserIndex] = newUser;
      } else {
        state.push(newUser);
      }
    },
  },
});

export const { setUsers, setUser } = userSlice.actions;
export default userSlice.reducer;

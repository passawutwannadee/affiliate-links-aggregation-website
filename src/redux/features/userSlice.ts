import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    emailVerified: 0,
    // other user-related state properties can be added here
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    // add other user-related reducers here
  },
});

export const { setCurrentUser, setEmailVerified } = userSlice.actions;

export default userSlice.reducer;

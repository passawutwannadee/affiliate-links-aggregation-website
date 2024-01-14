import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    emailVerified: 0,
    currentUserDN: null,
    currentUserPFP: null,
    // other user-related state properties can be added here
  },
  reducers: {
    //username
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    setCurrentUserDN: (state, action) => {
      state.currentUserDN = action.payload;
    },
    setCurrentUserPFP: (state, action) => {
      state.currentUserPFP = action.payload;
    },

    // add other user-related reducers here
  },
});

export const {
  setCurrentUser,
  setEmailVerified,
  setCurrentUserDN,
  setCurrentUserPFP,
} = userSlice.actions;

export default userSlice.reducer;

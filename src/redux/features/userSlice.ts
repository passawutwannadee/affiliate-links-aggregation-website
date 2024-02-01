import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  emailVerified: null,
  currentUserDN: null,
  currentUserPFP: null,
  currentRole: null,
  currentUserBanStatus: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
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
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setCurrentUserBanStatus: (state, action) => {
      state.currentUserBanStatus = action.payload;
    },
    // add other user-related reducers here
    reset: () => {
      // Reset the state to its initial values
      return initialState;
    },
  },
});

export const {
  setCurrentUser,
  setEmailVerified,
  setCurrentUserDN,
  setCurrentUserPFP,
  setCurrentRole,
  setCurrentUserBanStatus,
  reset,
} = userSlice.actions;

export default userSlice.reducer;

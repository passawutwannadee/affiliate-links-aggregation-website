import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    // other reducers can be added here
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postSlice from './postSlice';
export const store = configureStore({
  reducer: { user: userReducer, post: postSlice },
});
export type RootState = ReturnType<typeof store.getState>;

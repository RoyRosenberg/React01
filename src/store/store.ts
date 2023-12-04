import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../users/userSlice';
import postSlice from '../posts/postSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: { user: userReducer, post: postSlice },
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;

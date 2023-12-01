import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postSlice from './postSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: { user: userReducer, post: postSlice },
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;

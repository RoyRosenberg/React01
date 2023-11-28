import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/authenticate';
import { Post } from '../api/posts';

type State = {
  list: Post[];
  loading: boolean;
};

const initialState: State = {
  list: [],
  loading: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPostsAction: (state) => {
      state.loading = true;
    },
    fetchPostsSuccessAction: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchPostsFailedAction: (state) => {
      state.list = [];
      state.loading = true;
    },
  },
});

export const { fetchPostsAction, fetchPostsSuccessAction, fetchPostsFailedAction } =
  postSlice.actions;
export default postSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Post, fetchPosts } from '../api/posts';
import { RootState } from './store';

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
    fetchPostsInternal: (state) => {
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

export function fetchPostsAction() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(postSlice.actions.fetchPostsInternal());
    const s = getState();
    console.log('get post', s.post);
    console.log('get user', s.user);

    try {
      const data = await fetchPosts();
      dispatch(fetchPostsSuccessAction(data));
    } catch (error) {
      console.error('Error fetching data:', error);
      fetchPostsFailedAction();
    }
  };
}

export const { fetchPostsSuccessAction, fetchPostsFailedAction } = postSlice.actions;
export default postSlice.reducer;

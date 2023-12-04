import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Post, fetchPosts } from '../api/posts';
import { RootState } from './store';

type State = {
  list: Post[];
  loading: boolean;
  currentPost: Post | undefined;
};

const initialState: State = {
  list: [],
  loading: false,
  currentPost: undefined,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPostsSuccessAction: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchPostsFailedAction: (state) => {
      state.list = [];
      state.loading = true;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPostById.fulfilled, (state, { payload }) => {
      console.log('post found', payload);
      state.currentPost = payload as Post;
      state.loading = false;
    });
  },
});

export const fetchPostsAction = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { dispatch, getState }) => {
    //dispatch(postSlice.actions.fetchPostsInternal());
    const s = getState() as RootState;
    console.log('get post', s.post);
    console.log('get user', s.user);

    try {
      const data = await fetchPosts();
      dispatch(fetchPostsSuccessAction(data));
    } catch (error) {
      console.error('Error fetching data:', error);
      fetchPostsFailedAction();
    }
  },
);

export const getPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId: number, { dispatch, getState }) => {
    try {
      const data = await fetchPosts();
      const res = data.filter((p) => p.id === postId);
      return res[0];
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  },
);

export const { fetchPostsSuccessAction, fetchPostsFailedAction } = postSlice.actions;
export default postSlice.reducer;

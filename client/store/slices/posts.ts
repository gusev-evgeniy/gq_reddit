import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetPostsQuery, VoteMutation } from '../../generated/graphql';

export interface PostState {
  items: GetPostsQuery['posts']['items'];
  totalCount: number;
  loaded: boolean;
  skip: number;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  skip: 0,
  totalCount: 0
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<GetPostsQuery['posts']>) => {
      state.items.push(...action.payload.items);
      state.skip += action.payload.items.length;
      state.totalCount = action.payload.totalCount;
      state.loaded = true;
    },
    setPostsDefaultState: () => {
      return initialState;
    },
    updatePost: (state, action: PayloadAction<VoteMutation['vote']>) => {
      state.items = state.items.map(item =>
        item.UID === action.payload.UID ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const { setPosts, setPostsDefaultState, updatePost } = postsSlice.actions;

export const selectPosts = (state: AppState) => state.posts;

export const postsReducer = postsSlice.reducer;

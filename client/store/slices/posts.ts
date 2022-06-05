import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetPostsQuery, VoteMutation } from '../../generated/graphql';

export interface PostState {
  items: GetPostsQuery['posts']['items'];
  totalCount: number;
  loaded: boolean;
  skip: number;
  sort: 'new' | 'best';
  filter: string;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  skip: 0,
  totalCount: 0,
  sort: 'new',
  filter: ''
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
    changeSort: (state, action: PayloadAction<PostState['sort']>) => {
      state.sort = action.payload;
      state.loaded = false;
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.loaded = false;
    },
  },
});

export const { setPosts, setPostsDefaultState, updatePost, changeSort } = postsSlice.actions;

export const selectPosts = (state: AppState) => state.posts;

export const postsReducer = postsSlice.reducer;

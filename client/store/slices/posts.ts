import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetPostsQuery, VoteMutation } from '../../generated/graphql';
import { profileSlice } from './profile';

export interface PostState {
  items: GetPostsQuery['posts']['items'];
  totalCount: number;
  loaded: boolean;
  sort: 'new' | 'best';
  filter: string;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  totalCount: 0,
  sort: 'new',
  filter: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<GetPostsQuery['posts']>) => {
      state.items.push(...action.payload.items);
      state.totalCount = action.payload.totalCount;
    },
    postLoaded: state => {
      state.loaded = true;
    },
    updatePost: (state, action: PayloadAction<VoteMutation['vote']>) => {
      state.items = state.items.map(item =>
        item.UID === action.payload?.UID ? { ...item, ...action.payload } : item
      );
    },
    changeSort: (_, action: PayloadAction<PostState['sort']>) => {
      return { ...initialState, sort: action.payload };
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      return { ...state, filter: action.payload };
    },
    applyFilter: state => {
      state.items = [];
      state.loaded = false;
    },
    setPostsDefaultState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(profileSlice.actions.updateProfilePicture, (state, action: PayloadAction<string>) => {
      state.items = state.items.map(item => ({ ...item, author: { ...item.author, photo: action.payload } }));
    });
  },
});

export const {
  setPosts,
  setPostsDefaultState,
  updatePost,
  changeSort,
  changeFilter,
  applyFilter,
  postLoaded,
} = postsSlice.actions;

export const selectPosts = (state: AppState) => state.posts;

export const postsReducer = postsSlice.reducer;

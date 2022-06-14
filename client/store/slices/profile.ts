import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetPostsQuery, GetUserQuery } from '../../generated/graphql';
import { PostState } from './posts';

export interface ProfileState {
  user: GetUserQuery['getUser'] | null;
  posts: GetPostsQuery['posts']['items'];
  totalCount: number;
  loaded: boolean;
  loadedPosts: boolean;
  sort: 'new' | 'best';
}

const initialState: ProfileState = {
  user: null,
  posts: [],
  loaded: false,
  loadedPosts: false,
  totalCount: 0,
  sort: 'new',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileUser: (state, action: PayloadAction<GetUserQuery['getUser']>) => {
      state.user = action.payload;
      state.loaded = true;
    },
    setPostsProfile: (state, action: PayloadAction<GetPostsQuery['posts']>) => {
      state.posts.push(...action.payload.items);
      state.totalCount = action.payload.totalCount;
      state.loadedPosts = true;
    },
    changeProfilePostsSort: (state, action: PayloadAction<PostState['sort']>) => {
      return {...initialState, sort: action.payload};
    },
    setProfileDefaultState: () => {
      return initialState;
    },
  },
});

export const { setProfileUser, setPostsProfile, changeProfilePostsSort, setProfileDefaultState } = profileSlice.actions;

export const selectProfile = (state: AppState) => state.profile;

export const profileReducer = profileSlice.reducer;

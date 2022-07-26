import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetUserQuery } from '../../generated/graphql';
import { PostState } from './posts';

export interface ProfileState {
  user: GetUserQuery['getUser'] | null;
  totalCount: number;
  loaded: boolean;
  loadedPosts: boolean;
}

const initialState: ProfileState = {
  user: null,
  loaded: false,
  loadedPosts: false,
  totalCount: 0,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileUser: (state, action: PayloadAction<GetUserQuery['getUser']>) => {
      state.user = action.payload;
      state.loaded = true;
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.photo = action.payload;
      }
    },
    setProfileDefaultState: () => {
      return initialState;
    },
  },
});

export const { setProfileUser, setProfileDefaultState, updateProfilePicture } = profileSlice.actions;

export const selectProfile = (state: AppState) => state.profile;

export const profileReducer = profileSlice.reducer;

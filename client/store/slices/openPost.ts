import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetPostQuery } from '../../generated/graphql';

export interface OpenPostState {
  post: GetPostQuery['post'] | null;
  loaded: boolean;
}

const initialState: OpenPostState = {
  post: null,
  loaded: false,
};

export const openPostsSlice = createSlice({
  name: 'openPost',
  initialState,
  reducers: {
    setOpenPost: (state, action: PayloadAction<GetPostQuery['post']>) => {
      state.post = action.payload;
      state.loaded = true;
    },
    openPostDefault: () => {
      return initialState;
    }
  },
});

export const { setOpenPost, openPostDefault } = openPostsSlice.actions;

export const selectOpenPost = (state: AppState) => state.openPost;

export const openPostReducer = openPostsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetCommentsQuery, GetPostQuery } from '../../generated/graphql';

export interface OpenPostState {
  post: GetPostQuery['post'] | null;
  loaded: boolean;
  comments: GetCommentsQuery['getComments']['items']
}

const initialState: OpenPostState = {
  post: null,
  loaded: false,
  comments: []
};

export const openPostsSlice = createSlice({
  name: 'openPost',
  initialState,
  reducers: {
    setOpenPost: (state, action: PayloadAction<GetPostQuery['post']>) => {
      state.post = action.payload;
      state.loaded = true;
    },
    setComments: (state, action: PayloadAction<GetCommentsQuery['getComments']['items']>) => {
      state.comments.push(...action.payload);
    }
  },
});

export const { setOpenPost, setComments } = openPostsSlice.actions;

export const selectOpenPost = (state: AppState) => state.openPost;

export const openPostReducer = openPostsSlice.reducer;

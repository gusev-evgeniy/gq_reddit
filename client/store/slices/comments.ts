import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { GetCommentsQuery } from '../../generated/graphql';

export interface CommentsState {
  loaded: boolean;
  comments: GetCommentsQuery['getComments']['items']
}

const initialState: CommentsState = {
  loaded: false,
  comments: []
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<GetCommentsQuery['getComments']['items']>) => {
      state.comments.push(...action.payload);
      state.loaded = true;
    },
    commentsDefault: () => {
      return initialState;
    }
  },
});

export const { setComments, commentsDefault } = commentsSlice.actions;

export const selectComments = (state: AppState) => state.comments;

export const CommentsReducer = commentsSlice.reducer;

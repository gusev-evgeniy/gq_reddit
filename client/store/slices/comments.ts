import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { CommentVoteMutation, CreateCommentMutation, GetCommentsQuery } from '../../generated/graphql';
import { CommentType } from '../../types/comment';

export interface CommentsState {
  loaded: boolean;
  comments: CommentType[];
}

const initialState: CommentsState = {
  loaded: false,
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<GetCommentsQuery['getComments']>) => {
      const { items, parent } = action.payload;

      state.comments = _addComment(state.comments, items, parent);
      state.loaded = true;
    },
    addComment: (state, action: PayloadAction<CreateCommentMutation['createComment']>) => {
      const { items, parent } = action.payload;
      console.log('action.payload', action.payload);
      state.comments = _addComment(state.comments, items, parent);
    },
    updateComment: (state, action: PayloadAction<CommentVoteMutation['voteComment']>) => {
      state.comments = _updateComments(state.comments, action.payload);
    },
    commentsDefault: () => {
      return initialState;
    },
  },
});

export const { setComments, commentsDefault, addComment, updateComment } = commentsSlice.actions;

export const selectComments = (state: AppState) => state.comments;

export const commentsReducer = commentsSlice.reducer;

const _addComment = (
  comments: CommentsState['comments'],
  items: CommentsState['comments'],
  parent: string | null | undefined
) => {
  if (!parent) {
    return items;
  }

  return comments.reduce((acc, curr) => {
    if (curr.UID === parent) {
      acc.push({ ...curr, children: items, isEmpty: false });
      return acc;
    }

    if (curr.children && curr.children.length) {
      acc.push({ ...curr, children: _addComment(curr.children, items, parent) });
      return acc;
    }

    acc.push(curr);
    return acc;
  }, [] as CommentsState['comments']);
};

const _updateComments = (
  comments: CommentsState['comments'],
  payload: CommentVoteMutation['voteComment']
) => {
  return comments.reduce((acc, curr) => {
    if (curr.UID === payload?.UID) {
      acc.push({ ...curr, ...payload });
      return acc;
    }

    if (curr.children && curr.children.length) {
      acc.push({ ...curr, children: _updateComments(curr.children, payload) });
      return acc;
    }

    acc.push(curr);
    return acc;
  }, [] as CommentsState['comments']);
};

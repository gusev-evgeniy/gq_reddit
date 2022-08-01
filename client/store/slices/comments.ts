import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { CommentVoteMutation, CreateCommentMutation, GetCommentsQuery } from '../../generated/graphql';
import { CommentType, UpdateCommentType } from '../../types/comment';

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
      console.log('state.comments', state.comments);
      state.loaded = true;
    },
    addComment: (state, action: PayloadAction<CreateCommentMutation['createComment']>) => {
      const { items, parent } = action.payload;
      state.comments = _addComment(state.comments, items, parent);
    },
    updateComment: (state, action: PayloadAction<UpdateCommentType>) => {
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
    return items.map(item => ({ ...item, isOpen: !!item.children?.length }));
  }

  return comments.reduce((acc, curr) => {
    if (curr.UID === parent) {
      acc.push({ ...curr, children: items, isEmpty: false, isOpen: true });
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
  payload: UpdateCommentType
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

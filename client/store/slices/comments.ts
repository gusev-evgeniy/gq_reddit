import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { CommentVoteMutation, CreateCommentMutation, GetCommentsQuery } from '../../generated/graphql';

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
    addComment: (state, action: PayloadAction<CreateCommentMutation['createComment']>) => {
      const { items, parent } = action.payload;

      if (parent) {

      }
      else state.comments = items;
      
    },
    updateComment: (state, action: PayloadAction<CommentVoteMutation['voteComment']>) => {
      state.comments = state.comments.map(comment =>
        comment.UID === action.payload?.UID ? { ...comment, ...action.payload } : comment
      );
    },
    commentsDefault: () => {
      return initialState;
    }
  },
});

export const { setComments, commentsDefault, addComment, updateComment } = commentsSlice.actions;

export const selectComments = (state: AppState) => state.comments;

export const commentsReducer = commentsSlice.reducer;


// const _addComment = (comments: CommentsState['comments'], parent: string | null) => {
//   if (!parent) {
//     return comments;
//   }

//   return comments.reduce((acc, curr) => {

//     if(curr.UID === parent) {
//       acc.push({...curr, children: })
//     }
    
//     return acc;
//   }, [] as CommentsState['comments'])
}
import React, { FC, memo, useState } from 'react';

import { useCreateCommentMutation, CreateCommentMutationVariables } from '../../generated/graphql';
import { useAppDispatch } from '../../store/hooks';
import { addComment } from '../../store/slices/comments';
import { updateOpenPost } from '../../store/slices/openPost';

import { SubmitButton } from '../dialogs/auth/submitButton';
import { StyledTextareaAutosize } from '../editor/styles';

type Props = {
  postId: string;
  parent?: string;
  autoFocus?: boolean;
  close?: () => void;
};

export const CommentForm: FC<Props> = memo(({ postId, parent, autoFocus = false, close }) => {
  const [comment, setComment] = useState<string>('');

  const dispatch = useAppDispatch();

  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted({ createComment }) {
      setComment('');
      if (close) close();
      dispatch(addComment(createComment));
      dispatch(updateOpenPost({ commentsCount: createComment.commentsCount }));
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variables: CreateCommentMutationVariables = { text: comment.trim(), post: { UID: postId } };
    if (parent) variables.parent = { UID: parent };

    createComment({ variables });
  };

  return (
    <form onSubmit={onSubmit}>
      <StyledTextareaAutosize
        rows={1}
        placeholder='What are your thoughts?'
        value={comment}
        onChange={e => setComment(e.target.value)}
        autoFocus={autoFocus}
      />
      <div className='button_wrapper' id='button'>
        <SubmitButton disabled={!comment.trim().length} loading={loading} />
      </div>
    </form>
  );
});

CommentForm.displayName = 'CommentForm';

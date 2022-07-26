import React, { FC, useState } from 'react';

import { useCreateCommentMutation } from '../../generated/graphql';
import { useAppDispatch } from '../../store/hooks';
import { commentsDefault, updateComments } from '../../store/slices/comments';
import { openPostDefault, updateOpenPost } from '../../store/slices/openPost';

import { SubmitButton } from '../dialogs/auth/submitButton';
import { StyledTextareaAutosize } from '../editor/styles';
import { StyledCommentForm } from './styles';

type Props = {
  postId: string;
};

export const CommentForm: FC<Props> = ({ postId }) => {
  const [comment, setComment] = useState<string>('');

  const dispatch = useAppDispatch();

  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted({ createComment }) {
      setComment('');
      dispatch(updateComments(createComment.items));
      dispatch(updateOpenPost({ commentsCount: createComment.commentsCount }));
    },
  });

  const onSubmit = () => {
    createComment({
      variables: { text: comment, post: { UID: postId } },
    });
  };

  return (
    <StyledCommentForm>
      <>
        <StyledTextareaAutosize
          rows={1}
          placeholder='What are your thoughts?'
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className='button_wrapper' id='button'>
          <SubmitButton disabled={!comment.length} loading={loading} onClick={onSubmit} />
        </div>
      </>
    </StyledCommentForm>
  );
};

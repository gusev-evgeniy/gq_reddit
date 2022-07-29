import React, { FC, useLayoutEffect } from 'react';

import { Comment } from './comment';
import { useCommentVoteMutation, useGetCommentsLazyQuery } from '../../generated/graphql';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectComments, setComments, updateComment } from '../../store/slices/comments';

type Props = {
  postId: string;
};

export const Comments: FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const { comments, loaded } = useAppSelector(selectComments);
  console.log('comments1111111111111111', comments);
  const [vote] = useCommentVoteMutation({
    onCompleted({ voteComment }) {
      console.log('voteComment', voteComment);
      dispatch(updateComment(voteComment));
    },
  });

  const onVote = (UID: string, value: 1 | -1) => vote({ variables: { commentUid: { UID }, value } });

  const [getComments] = useGetCommentsLazyQuery({
    onCompleted({ getComments }) {
      console.log('getComments', getComments);
      dispatch(setComments(getComments.items));
    },
    variables: { post: { UID: postId as string } },
    fetchPolicy: 'no-cache',
  });

  useLayoutEffect(() => {
    if (!loaded) {
      getComments();
    }
  }, [loaded]);

  return (
    <>
      {comments.map(item => (
        <Comment key={item.UID} {...item} onVote={onVote} postId={postId}/>
      ))}
    </>
  );
};
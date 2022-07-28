import React, { FC, useLayoutEffect } from 'react';

import { Comment } from './comment';
import { useCommentVoteMutation, useGetCommentsLazyQuery } from '../../generated/graphql';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectComments, setComments } from '../../store/slices/comments';

type Props = {
  postId: string;
};

export const Comments: FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const { comments, loaded } = useAppSelector(selectComments);

  const [vote] = useCommentVoteMutation({
    onCompleted(data) {
      console.log('data', data);
      // onLikePost(data.votePost);
    },
  });

  const onVote = (UID: string, value: 1 | -1) => vote({ variables: { commentUid: { UID }, value } });

  const [getComments] = useGetCommentsLazyQuery({
    onCompleted(data) {
      dispatch(setComments(data.getComments.items));
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
        <Comment key={item.UID} {...item} onVote={onVote}/>
      ))}
    </>
  );
};
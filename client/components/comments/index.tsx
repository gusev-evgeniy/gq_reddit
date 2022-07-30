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

  const [vote] = useCommentVoteMutation({
    onCompleted({ voteComment }) {
      dispatch(updateComment(voteComment));
    },
  });

  const onVote = (UID: string, value: 1 | -1) => vote({ variables: { commentUid: { UID }, value } });

  const [getComments] = useGetCommentsLazyQuery({
    onCompleted({ getComments }) {
      dispatch(setComments(getComments));
    },
    fetchPolicy: 'no-cache',
  });

  useLayoutEffect(() => {
    if (!loaded) {
      getComments({
        variables: { post: { UID: postId as string } },
      });
    }
  }, [loaded]);

  const loadAnswers = (UID: string) => {
    getComments({
      variables: { parent: { UID } },
    });
  };

  return (
    <>
      {comments.map(item => (
        <Comment
          key={item.UID}
          {...item}
          onVote={onVote}
          postId={postId}
          marginLeft={0}
          loadAnswers={loadAnswers}
        />
      ))}
    </>
  );
};

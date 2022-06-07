import React, { FC, memo, useEffect, useLayoutEffect } from 'react';
import { Comment } from '.';
import { useGetCommentsLazyQuery } from '../../generated/graphql';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectComments, setComments } from '../../store/slices/comments';

type Props = {
  postId: string;
};

export const Comments: FC<Props> = memo(({ postId }) => {
  const dispatch = useAppDispatch();

  const { comments, loaded } = useAppSelector(selectComments);

  const [getComments, { data: response, called, refetch }] = useGetCommentsLazyQuery();

  useLayoutEffect(() => {
    if (!loaded) {
      if (called) refetch({ post: { UID: postId as string } });
      else getComments({ variables: { post: { UID: postId as string } } });
    }
  }, [loaded]);

  
  useEffect(() => {
    const items = response?.getComments.items;

    if (items) {
      dispatch(setComments(items));
    }
  }, [response]);

  return (
    <>
      {comments.map(item => <Comment key={item.UID} {...item}/>)}
    </>
  );
});

Comments.displayName = 'Comments';
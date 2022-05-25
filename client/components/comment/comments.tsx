import React, { FC } from 'react';
import { Comment } from '.';
import { CommentsType } from '../../types/comment';

type Props = {
  comments: CommentsType;
};

export const Comments: FC<Props> = ({ comments = [] }) => {
  return (
    <>
      {comments.map(item => <Comment key={item.UID} {...item}/>)}
    </>
  );
};

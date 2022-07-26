import React, { FC } from 'react';
import { StyledEmptyPost, StyledEmptyText } from '../styled';
import { PostsEmptyItem } from './item';

type Props = {
  text: string;
};

export const PostsEmpty: FC<Props> = ({ text }) => {
  return (
    <StyledEmptyPost>
      <StyledEmptyText>{text}</StyledEmptyText>
      {Array(10).map((_, i) => (
        <PostsEmptyItem key={i}/>
      ))}
    </StyledEmptyPost>
  );
};

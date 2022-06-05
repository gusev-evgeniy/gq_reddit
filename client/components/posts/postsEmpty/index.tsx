import React from 'react';
import { StyledEmptyPost, StyledEmptyText } from '../styled';
import { PostsEmptyItem } from './item';

export const PostsEmpty = () => {
  return (
    <StyledEmptyPost>
      <StyledEmptyText>User don&apos;t have posts yeat </StyledEmptyText>
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
      <PostsEmptyItem />
    </StyledEmptyPost>
  );
};

import Image from 'next/image';
import React, { FC } from 'react';
import { StyledPostFooter, PostFooterButton } from '../styled';

import comment from '../../../images/comment.svg';
import bookmark from '../../../images/bookmark.svg';

type Props = {
  isLarge?: boolean;
  commentsCount: number;
};

export const PostFooter: FC<Props> = ({ isLarge, commentsCount }) => {
  return (
    <StyledPostFooter>
      <PostFooterButton disabled={isLarge}>
        <Image width='18px' height='18px' src={comment} alt='search_icon' />
        <span>{commentsCount}</span>
        <span>Comments</span>
      </PostFooterButton>
      <PostFooterButton>
        <Image width='18px' height='18px' src={bookmark} alt='search_icon' />
        <span>Save</span>
      </PostFooterButton>
    </StyledPostFooter>
  );
};

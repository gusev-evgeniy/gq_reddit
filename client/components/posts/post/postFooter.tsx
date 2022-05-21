import Image from 'next/image';
import React, { FC } from 'react';
import { StyledPostFooter, PostFooterButton } from '../styled';

import comment from '../../../images/comment.svg';
import bookmark from '../../../images/bookmark.svg';

type Props = {
  isLarge?: boolean;
};

export const PostFooter: FC<Props> = ({ isLarge }) => {
  return (
    <StyledPostFooter>
      <PostFooterButton disabled={isLarge}>
        <Image width='18px' height='18px' src={comment} alt='search_icon' />
        <span>147</span>
        <span>Comments</span>
      </PostFooterButton>
      <PostFooterButton>
        <Image width='18px' height='18px' src={bookmark} alt='search_icon' />
        <span>Save</span>
      </PostFooterButton>
    </StyledPostFooter>
  );
};

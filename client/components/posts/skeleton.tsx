import React, { FC } from 'react';
import { PostRatingWrapper, StyledPostHeader, StyledPostItem, VoteButton } from './styled';
import Image from 'next/image';

import thumb_up from '../../images/thumb_up.svg';
import thumb_down from '../../images/thumb_down.svg';
import { PostFooter } from './post/postFooter';

type Props = {
  isLarge?: boolean;
};

export const PostSkeleton: FC<Props> = ({ isLarge }) => {
  return (
    <>
      <PostRatingWrapper isGray={!isLarge}>
        <VoteButton>
          <Image width='23px' height='23px' src={thumb_up} alt='like post button' />
        </VoteButton>
        <p>0</p>
        <VoteButton>
          <Image width='23px' height='23px' src={thumb_down} alt='dislike post button' />
        </VoteButton>
      </PostRatingWrapper>

      <div className='body_wrapper'>
        <StyledPostHeader>
          <div className='info skeleton_wrapper'>
            <div className='ava_wrapper skeleton' />
            <div className='skeleton_wrapper'>
              <div className='skeleton skeleton-text' />
              <div className='skeleton skeleton-text' />
            </div>
          </div>
        </StyledPostHeader>
        <div className='body'>
          <div className='skeleton skeleton-text' />
          <div className='skeleton skeleton-text' />
          <div className='skeleton skeleton-text' />
          <div className='skeleton skeleton-text' />
          <div className='skeleton skeleton-text' />
        </div>
        <PostFooter isLarge={isLarge} commentsCount={0} />
      </div>
    </>
  );
};

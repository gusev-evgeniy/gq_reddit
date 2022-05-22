import Image from 'next/image';
import React from 'react';

import thumb_up from '../../images/thumb_up.svg';
import thumb_down from '../../images/thumb_down.svg';
import comment from '../../images/comment.svg';

import { Ava } from '../../styles';
import { CommentFooterButton, StyledCommentItem } from './styles';
import { PostFooterButton } from '../posts/styled';

export const Comment = () => {
  return (
    <StyledCommentItem>
      <div className='ava_section'>
        <div className='ava_wrapper'>
          <Ava />
        </div>
      </div>
      <div className='data_section'>
        <div className='header'>
          <p className='name'>Name</p>
          <span className='dot'> &#8226;</span>
          <p className='created_at'>2 hr. ago</p>
        </div>
        <div className='body_section'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis error dolorum obcaecati
          ducimus reiciendis, iure quibusdam eius totam nostrum voluptatem!
        </div>
        <div className='footer'>
          <div className='rating'>
            <CommentFooterButton>
              <Image width='20px' height='20px' src={thumb_up} alt='like comment button' />
            </CommentFooterButton>
            <p>186</p>
            <CommentFooterButton>
              <Image width='20px' height='20px' src={thumb_down} alt='dislike comment button' />
            </CommentFooterButton>
          </div>
          <CommentFooterButton>
              <Image width='20px' height='20px' src={comment} alt='reply comment button' />
              <p>Comment</p>
            </CommentFooterButton>
        </div>
      </div>
    </StyledCommentItem>
  );
};

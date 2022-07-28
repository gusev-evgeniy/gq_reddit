import Image from 'next/image';
import React, { FC, memo } from 'react';

import thumb_up from '../../images/thumb_up.svg';
import thumb_down from '../../images/thumb_down.svg';
import comment from '../../images/comment.svg';

import { Ava } from '../../styles';
import { CommentFooterButton, StyledCommentItem } from './styles';
import { GetCommentsQuery } from '../../generated/graphql';
import { getRelativeDate } from '../../utils/date';

type Props = GetCommentsQuery['getComments']['items'][0] & {
  onVote: (UID: string, value: 1 | -1) => void;
};

export const Comment: FC<Props> = memo(({ author, createdAt, text, onVote, UID }) => {
  const relativeDate = getRelativeDate(createdAt);

  return (
    <StyledCommentItem>
      <div className='ava_section'>
        <div className='ava_wrapper'>
          <Ava backgroundImage={author.photo ? author.photo : undefined}/>
        </div>
      </div>
      <div className='data_section'>
        <div className='header'>
          <p className='name'>{author.login}</p>
          <span className='dot'> &#8226;</span>
          <p className='created_at'>{relativeDate}</p>
        </div>
        <div style={{ whiteSpace: 'pre-line' }}>{text}</div>        
        <div className='footer'>
          <div className='rating'>
            <CommentFooterButton onClick={() => onVote(UID, 1)}>
              <Image width='20px' height='20px' src={thumb_up} alt='like comment button' />
            </CommentFooterButton>
            <p>186</p>
            <CommentFooterButton  onClick={() => onVote(UID, -1)}>
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
});

Comment.displayName = 'Comment';


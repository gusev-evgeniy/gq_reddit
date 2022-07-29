import Image from 'next/image';
import React, { FC, memo, useMemo, useState } from 'react';

import thumb_up from '../../images/thumb_up.svg';
import thumb_up_fill from '../../images/thumb_up_fill.svg';
import thumb_down from '../../images/thumb_down.svg';
import comment from '../../images/comment.svg';
import thumb_down_fill from '../../images/thumb_down_fill.svg';

import { Ava } from '../../styles';
import { CommentFooterButton, StyledAnswerCommentForm, StyledCommentItem } from './styles';
import { GetCommentsQuery } from '../../generated/graphql';
import { getRelativeDate } from '../../utils/date';
import { CommentForm } from './commentForm';

type Props = GetCommentsQuery['getComments']['items'][0] & {
  onVote: (UID: string, value: 1 | -1) => void;
  postId: string;
};

export const Comment: FC<Props> = memo(
  ({ author, createdAt, text, onVote, UID, votesCount, myVote, postId }) => {
    const [openForm, setOpenForm] = useState(false);

    const relativeDate = useMemo(() => getRelativeDate(createdAt), [createdAt]);

    const onOpenForm = () => {
      // setOpenForm(prev => !prev)
    };

    return (
      <StyledCommentItem>
        <div className='ava_section'>
          <div className='ava_wrapper'>
            <Ava backgroundImage={author.photo ? author.photo : undefined} />
          </div>
        </div>
        <div className='data_section'>
          <div className='header'>
            <p className='name'>{author.login}</p>
            <span className='dot'> &#8226;</span>
            <p className='created_at'>{relativeDate}</p>
          </div>
          <div  className='body' >{text}</div>
          <div className='footer'>
            <div className='rating'>
              <CommentFooterButton onClick={() => onVote(UID, 1)}>
                <Image
                  width='20px'
                  height='20px'
                  src={myVote === 1 ? thumb_up_fill : thumb_up}
                  alt='like comment button'
                />
              </CommentFooterButton>
              <p>{votesCount}</p>
              <CommentFooterButton onClick={() => onVote(UID, -1)}>
                <Image
                  width='20px'
                  height='20px'
                  src={myVote === -1 ? thumb_down_fill : thumb_down}
                  alt='dislike comment button'
                />
              </CommentFooterButton>
            </div>
            <CommentFooterButton onClick={onOpenForm}>
              <Image width='20px' height='20px' src={comment} alt='reply comment button' />
              <p>Comment</p>
            </CommentFooterButton>
          </div>
          {openForm && (
            <StyledAnswerCommentForm>
              <CommentForm postId={postId} parent={UID}/>
            </StyledAnswerCommentForm>
          )}
        </div>
      </StyledCommentItem>
    );
  }
);

Comment.displayName = 'Comment';

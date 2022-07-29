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

type Comment = Omit<GetCommentsQuery['getComments']['items'][0], 'children'>;
type Props = Comment & {
  onVote: (UID: string, value: 1 | -1) => void;
  postId: string;
  marginLeft: number;
  children?: Comment[];
};

export const Comment: FC<Props> = memo(
  ({ author, createdAt, text, onVote, UID, votesCount, myVote, postId, children, marginLeft }) => {
    const [openForm, setOpenForm] = useState(false);
    const relativeDate = useMemo(() => getRelativeDate(createdAt), [createdAt]);

    return (
      <>
        <StyledCommentItem marginLeft={marginLeft}>
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
            <div className='body'>{text}</div>

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
              <CommentFooterButton onClick={() => setOpenForm(prev => !prev)}>
                <Image width='20px' height='20px' src={comment} alt='reply comment button' />
                <p>Comment</p>
              </CommentFooterButton>
            </div>

            {openForm && (
              <StyledAnswerCommentForm>
                <CommentForm postId={postId} parent={UID} close={() => setOpenForm(false)} autoFocus={true} />
              </StyledAnswerCommentForm>
            )}
          </div>
        </StyledCommentItem>

        {!!children && children.length && (
          <>
            {children.map(item => (
              <Comment
                key={item.UID}
                {...item}
                onVote={onVote}
                postId={postId}
                marginLeft={marginLeft + 20}
              />
            ))}
          </>
        )}
      </>
    );
  }
);

Comment.displayName = 'Comment';

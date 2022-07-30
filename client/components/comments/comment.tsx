import Image from 'next/image';
import React, { FC, memo, useMemo, useState } from 'react';

import thumb_up from '../../images/thumb_up.svg';
import thumb_up_fill from '../../images/thumb_up_fill.svg';
import thumb_down from '../../images/thumb_down.svg';
import comment from '../../images/comment.svg';
import thumb_down_fill from '../../images/thumb_down_fill.svg';

import { CommentFooterButton, ShowAnswersButton, StyledAnswerCommentForm, StyledCommentItem } from './styles';
import { getRelativeDate } from '../../utils/date';
import { CommentForm } from './commentForm';
import { CommentType } from '../../types/comment';
import { useRouter } from 'next/router';
import { Avatar } from '../avatar';

type Props = CommentType & {
  onVote: (UID: string, value: 1 | -1) => void;
  postId: string;
  marginLeft: number;
  loadAnswers: (UID: string) => void;
};

export const Comment: FC<Props> = memo(
  ({
    author,
    createdAt,
    text,
    onVote,
    UID,
    votesCount,
    myVote,
    postId,
    children,
    marginLeft,
    isEmpty,
    loadAnswers,
  }) => {
    const [openForm, setOpenForm] = useState(false);
    const relativeDate = useMemo(() => getRelativeDate(createdAt), [createdAt]);

    const router = useRouter();

    const openProfile = (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();
      router.push({
        pathname: '/user/[login]',
        query: { login: author.login },
      });
    };

    return (
      <>
        <StyledCommentItem marginLeft={marginLeft}>
          <div className='ava_section'>
            <Avatar photo={author.photo} login={author.login} />
          </div>
          <div className='data_section'>
            <div className='header'>
              <p className='name' onClick={openProfile}>
                {author.login}
              </p>
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

            {!isEmpty && !children?.length && (
              <ShowAnswersButton onClick={() => loadAnswers(UID)}>Show Answers</ShowAnswersButton>
            )}
          </div>
        </StyledCommentItem>

        {!!children && children?.length > 0 && (
          <>
            {children.map(item => (
              <Comment
                key={item.UID}
                {...item}
                onVote={onVote}
                postId={postId}
                marginLeft={marginLeft + 25}
                loadAnswers={loadAnswers}
              />
            ))}
          </>
        )}
      </>
    );
  }
);

Comment.displayName = 'Comment';

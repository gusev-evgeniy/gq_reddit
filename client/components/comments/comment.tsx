import Image from 'next/image';
import React, { FC, memo, useMemo, useState } from 'react';

import thumb_up from '../../images/thumb_up.svg';
import thumb_up_fill from '../../images/thumb_up_fill.svg';
import thumb_down from '../../images/thumb_down.svg';
import comment from '../../images/comment.svg';
import thumb_down_fill from '../../images/thumb_down_fill.svg';

import { StyledChildrenTrad, CommentFooterButton, ShowAnswersButton, StyledAnswerCommentForm, StyledCommentItem, Trad } from './styles';
import { getRelativeDate } from '../../utils/date';
import { CommentForm } from './commentForm';
import { CommentType, UpdateCommentType } from '../../types/comment';
import { useRouter } from 'next/router';
import { Avatar } from '../avatar';

type Props = CommentType & {
  onVote: (UID: string, value: 1 | -1) => void;
  postId: string;
  marginLeft: number;
  loadAnswers: (UID: string) => void;
  updateCommentHandler: (obj: UpdateCommentType) => void;
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
    isOpen,
    updateCommentHandler
  }) => {
    const [openForm, setOpenForm] = useState(false);
    const relativeDate = useMemo(() => getRelativeDate(createdAt), [createdAt]);
    console.log('!isEmpty', !isEmpty);
    console.log('!isOpen', !isOpen);
    console.log('!children?.length', children?.length);

    const router = useRouter();

    const openProfile = (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();
      router.push({
        pathname: '/user/[login]',
        query: { login: author.login },
      });
    };

    const onToggleAnswers = () => {
      updateCommentHandler({ UID, isOpen: !isOpen });
    };

    const onShowAnswersHandler = () => {
      const answersLoaded = !!children?.length;

      if (answersLoaded) onToggleAnswers();
      else loadAnswers(UID);
    };

    return (
      <StyledChildrenTrad marginLeft={marginLeft}>
        <StyledCommentItem >
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

            {!isEmpty && !isOpen && (
              <ShowAnswersButton onClick={onShowAnswersHandler}>Show Answers</ShowAnswersButton>
            )}
          </div>
        </StyledCommentItem>

          {!!children && children?.length > 0 && isOpen && (
            <>
              {children.map(item => (
                <Comment
                  key={item.UID}
                  {...item}
                  onVote={onVote}
                  postId={postId}
                  marginLeft={25}
                  loadAnswers={loadAnswers}
                  updateCommentHandler={updateCommentHandler}
                />
              ))}
              <Trad data-uid={UID} onClick={onToggleAnswers}/>
            </>
          )}
      </StyledChildrenTrad>
    );
  }
);

Comment.displayName = 'Comment';

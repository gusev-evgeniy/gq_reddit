import React, { FC } from 'react';
import Image from 'next/image';

import { GetPostQuery, useVoteMutation } from '../../../generated/graphql';
import { PostHeader } from './postHeader';
import { PostFooter } from './postFooter';

import thumb_up from '../../../images/thumb_up.svg';
import thumb_up_fill from '../../../images/thumb_up_fill.svg';
import thumb_down from '../../../images/thumb_down.svg';
import thumb_down_fill from '../../../images/thumb_down_fill.svg';

import { Content } from '../../content';
import { PostRatingWrapper, VoteButton } from '../styled';

type Props = GetPostQuery['post'] & { isLarge?: boolean };

export const Post: FC<Props> = ({ title, block, createdAt, isLarge, author, UID, votesCount, myVote }) => {
  const [vote] = useVoteMutation();
  console.log('myVote', myVote);

  const onVote = (value: 1 | -1) => vote({ variables: { postUid: { UID }, value } });

  const onDislike = (e: any) => {
    e.stopPropagation();
    onVote(-1);
  };

  const onLike = (e: any) => {
    e.stopPropagation();
    onVote(1);
  };

  return (
    <>
      <PostRatingWrapper isGray={!isLarge}>
        <VoteButton onClick={onLike}>
          <Image
            width='23px'
            height='23px'
            src={myVote === 1 ? thumb_up_fill : thumb_up}
            alt='like post button'
          />
        </VoteButton>
        <p>{votesCount}</p>
        <VoteButton onClick={onDislike}>
          <Image
            width='23px'
            height='23px'
            src={myVote === -1 ? thumb_down_fill : thumb_down}
            alt='dislike post button'
          />
        </VoteButton>
      </PostRatingWrapper>

      <div className='body_wrapper'>
        <PostHeader author={author} createdAt={createdAt} />
        <div className='body'>
          <h2 className='title'>{title}</h2>
          <Content isLarge={isLarge} content={block} />
        </div>
        <PostFooter isLarge={isLarge} />
      </div>
    </>
  );
};

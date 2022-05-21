import React, { FC } from 'react';
import Image from 'next/image';

import { GetPostQuery } from '../../../generated/graphql';
import { PostHeader } from './postHeader';
import { PostFooter } from './postFooter';


import vote from '../../../images/vote.svg';

import { StyledPostItem, TextContent, VoteDown, VoteUp } from '../styled';
import { CommentForm } from './commentForm';

type Props = GetPostQuery['post'] & { isLarge?: boolean };

export const Post: FC<Props> = ({ title, block, createdAt, isLarge, author }) => {
  return (
    <StyledPostItem isLarge={isLarge}>
      <div className='rating'>
        <VoteUp>
          <Image width='30px' height='30px' src={vote} alt='search_icon' />
        </VoteUp>
        <p>18.5k</p>
        <VoteDown>
          <Image width='30px' height='30px' src={vote} alt='search_icon' />
        </VoteDown>
      </div>
      <div className='body_wrapper'>
        <PostHeader author={author} createdAt={createdAt}/>
        <div className='body'>
          <h2 className='title'>{title}</h2>
          <TextContent isLarge={isLarge}>
            {block.map(({ data }, index: number) => {
              const htmlContent = { __html: data.text };

              return <p key={index} dangerouslySetInnerHTML={htmlContent} />;
            })}
          </TextContent>
        </div>
        <PostFooter isLarge={isLarge}/>
      {!!isLarge && <CommentForm/>}
      </div>
    </StyledPostItem>
  );
};

import React, { FC } from 'react';
import { StyledPostItem, TextContent, VoteDown, VoteUp } from '../styled';

import vote from '../../../images/vote.svg';
import Image from 'next/image';
import { GetPostQuery } from '../../../generated/graphql';
import { Header } from './header';

type Props = GetPostQuery['getPost']['items'][0];

export const Post: FC<Props> = ({ title, block, createdAt }) => {
  return (
    <StyledPostItem>
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
        <Header />
        <div className='body'>
          <h2 className='title'>{title}</h2>
          <TextContent>
            {block.map(({ data }, index: number) => {
              const htmlContent = { __html: data.text };

              return <p key={index} dangerouslySetInnerHTML={htmlContent} />;
            })}
          </TextContent>
        </div>
        <div className='footer'>
          <button>
            <Image width='18px' height='18px' src={vote} alt='search_icon' />
          </button>
          <button>Share</button>
          <button>Save</button>
        </div>
      </div>
    </StyledPostItem>
  );
};

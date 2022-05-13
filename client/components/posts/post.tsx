import React, { FC } from 'react';
import { StyledPostItem, VoteDown, VoteUp } from './styled';

import vote from '../../images/vote.svg';
import Image from 'next/image';
import { GetPostQuery } from '../../generated/graphql';

type Props = GetPostQuery['getPost']['items'][0];

export const Post: FC<Props> = ({ UID, title, block, createdAt }) => {
  console.log('block', block.data);

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
        <div>
          <div className='header'>
            <h6 className='author'>r/wallstreetbets</h6>
            <p className='info'>
              Posted by
              <span>u/catbulliesdog</span>
              {` `}
              <span>{createdAt}</span>
              <button>Join</button>
            </p>
          </div>
          <div className='body'>
            <h2 className='title'>{title}</h2>
            <div >
              {block.map(({data}, index) => {
                const htmlContent = {  __html: data.text };

                return <div key={index} dangerouslySetInnerHTML={htmlContent} />;
              })}
            </div>
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

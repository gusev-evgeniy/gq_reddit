import Link from 'next/link';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Ava, MainButton } from '../../../styles';
import { StyledPostHeader } from '../styled';

type Props = {
  createdAt?: string;
  author?: {
    UID: string;
    login: string;
  };
  group?: {
    UID: string;
    name: string;
  };
};

dayjs.extend(relativeTime);

export const PostHeader: FC<Props> = ({ createdAt, author, group }) => {
  const relativeDate = dayjs().to(dayjs(createdAt));

  return (
    <StyledPostHeader>
      <div className='info'>
        {/* {group && (
        <>
          <div className='ava_wrapper'>
            <Ava />
          </div>
          <p className='group'>r/{group.name}</p>
          <span> &#8226;</span>
        </>
      )} */}
        <div className='ava_wrapper'>
          <Ava />
        </div>
        <p className='group'>r/wallStreet</p>
        <span className='dot'> &#8226;</span>
        <p className='author'>
          Posted by
          {` `}
          <Link href={'/'}>
            <a>u/{author?.login}</a>
          </Link>
          {` `}
          <span>{relativeDate}</span>
        </p>
      </div>
      <MainButton height='24px' width='54px'>Join</MainButton>
    </StyledPostHeader>
  );
};
import Link from 'next/link';
import React, { FC } from 'react';

import { Ava, MainButton } from '../../../styles';
import { StyledPostHeader } from '../styled';
import { getRelativeDate } from '../../../utils/date';
import { useRouter } from 'next/router';

type Props = {
  createdAt: string;
  author: {
    UID: string;
    login: string;
  };
  group?: {
    UID: string;
    name: string;
  };
};

export const PostHeader: FC<Props> = ({ createdAt, author, group }) => {
  const relativeDate = getRelativeDate(createdAt);
  const router = useRouter();

  const onClickLogin = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    router.push({
      pathname: '/user/[login]',
      query: { login: author.login },
    });
  };


  return (
    <StyledPostHeader>
      <div className='info'>
        <div className='ava_wrapper'>
          <Ava />
        </div>
        <p className='group'>r/wallStreet</p>
        <span className='dot'> &#8226;</span>
        <p className='author'>
          Posted by
          {` `}
          <span onClick={onClickLogin}>
            <a>u/{author.login}</a>
          </span>
          {` `}
          <span>{relativeDate}</span>
        </p>
      </div>
      {/* <MainButton height='24px' width='54px'>Join</MainButton> */}
    </StyledPostHeader>
  );
};

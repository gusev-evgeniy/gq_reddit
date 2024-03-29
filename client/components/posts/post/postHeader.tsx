import React, { FC, useMemo } from 'react';

import { StyledPostHeader } from '../styled';
import { getRelativeDate } from '../../../utils/date';
import { useRouter } from 'next/router';
import { Avatar } from '../../avatar';

type Props = {
  createdAt: string;
  author: {
    UID: string;
    login: string;
    photo?: string | null;
  };
  group?: {
    UID: string;
    name: string;
  };
};

export const PostHeader: FC<Props> = ({ createdAt, author, group }) => {
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
    <StyledPostHeader>
      <div className='info'>
        <Avatar photo={author.photo} login={author.login} />
        {/* <p className='group'>r/wallStreet</p> */}
        <span className='dot'> &#8226;</span>
        <p className='author'>
          Posted by
          {` `}
          <span onClick={openProfile}>
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

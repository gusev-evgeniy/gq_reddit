import Link from 'next/link';
import React, { FC } from 'react';
import { Ava } from '../../../styles';
import { PaintedNavButton } from '../../navigations.tsx/styles';
import { StyledHeader } from '../styled';

type Props = {
  createdAt?: string;
  author?: {
    UID: string;
    name: string;
  };
  group?: {
    UID: string;
    name: string;
  };
};

export const Header: FC<Props> = ({ createdAt, author, group }) => {
  return (
    <StyledHeader>
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
            <a>u/autorName</a>
          </Link>
          {` `}
          <span>15 hours ago</span>
        </p>
      </div>
      <PaintedNavButton>Join</PaintedNavButton>
    </StyledHeader>
  );
};

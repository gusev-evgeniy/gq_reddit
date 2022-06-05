import Image from 'next/image';
import React from 'react';

import thumb_up from '../../../images/thumb_up.svg';
import thumb_down from '../../../images/thumb_down.svg';
import { StyledEmptyPostItem } from '../styled';

export const PostsEmptyItem = () => {
  return (
    <StyledEmptyPostItem>
      <div className='buttons'>
        <Image width='23px' height='23px' src={thumb_up} alt='like post button' />
        <Image width='23px' height='23px' src={thumb_down} alt='dislike post button' />
      </div>
    </StyledEmptyPostItem>
  );
};

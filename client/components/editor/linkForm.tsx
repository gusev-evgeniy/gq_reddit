import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import image from '../../images/image.svg';
import { Ava, MainInput } from '../../styles';
import { AddImage, StyledEditorLink } from './styles';

export const LinkForm = () => {
  return (
    <Link href='/submit'>
      <a>
        <StyledEditorLink>
          <div className='ava_wrapper'>
            <Ava />
          </div>
          <MainInput type='text' placeholder='Create Post' />
          <AddImage>
            <Image width='30px' height='30px' src={image} alt='user' />
          </AddImage>
        </StyledEditorLink>
      </a>
    </Link>
  );
};

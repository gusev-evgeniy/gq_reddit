import Image from 'next/image';
import React, { FC, memo } from 'react';
import Link from 'next/link';

import image from '../../images/image.svg';
import { Ava, MainInput } from '../../styles';
import { AddImage, StyledEditorLink } from './styles';

type Props = {
  photo: string | null;
};

export const LinkForm: FC<Props> = memo(({ photo }) => {
  return (
    <Link href='/submit'>
      <a>
        <StyledEditorLink>
          <div className='ava_wrapper'>
            <Ava backgroundImage={photo ? photo : undefined}/>
          </div>
          <MainInput type='text' placeholder='Create Post' />
          <AddImage>
            <Image width='30px' height='30px' src={image} alt='user' />
          </AddImage>
        </StyledEditorLink>
      </a>
    </Link>
  );
});

LinkForm.displayName = 'LinkForm';
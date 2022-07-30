import Image from 'next/image';
import React, { FC, memo } from 'react';

import image from '../../images/image.svg';
import { MainInput } from '../../styles';
import { AddImage, StyledEditorLink } from './styles';
import { Avatar } from '../avatar';
import { useRouter } from 'next/router';

type Props = {
  photo: string | null;
  login: string;
};

export const LinkForm: FC<Props> = memo(({ photo, login }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.replace(`/submit`)}>
        <StyledEditorLink>
          <Avatar photo={photo} login={login} />
          <MainInput type='text' placeholder='Create Post' />
          <AddImage>
            <Image width='30px' height='30px' src={image} alt='user' />
          </AddImage>
        </StyledEditorLink>
    </div>
  );
});

LinkForm.displayName = 'LinkForm';

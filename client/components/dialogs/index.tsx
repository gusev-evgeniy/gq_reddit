import React, { FC } from 'react';
import { CloseButton, DialogWrapper } from './styles';

import close from '../../images/close.svg';
import Image from 'next/image';
import { SignUp } from './auth/signUp';
import { Login } from './auth/login';

const components = {
  'sign up': <SignUp />,
  'login': <Login />
};
type Components = typeof components;

type Props = {
  type: keyof Components;
  onClose: () => void;
};

export const Dialogs: FC<Props> = ({ type, onClose }) => {
  return (
    <DialogWrapper>
      <div className='dialog'>
        <CloseButton onClick={onClose}>
          <Image width='30px' height='30px' src={close} alt='close' className='close' />
        </CloseButton>
        {components[type]}
      </div>
    </DialogWrapper>
  );
};

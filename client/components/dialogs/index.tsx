import React, { FC } from 'react';
import { CloseButton, DialogWrapper } from './styles';

import close from '../../images/close.svg';
import Image from 'next/image';
import { SignUp } from './auth/signUp';
import { Login } from './auth/login';
import { DialogType } from '../../types/dialog';


type Props = {
  type: DialogType;
  onClose: () => void;
};

export const Dialogs: FC<Props> = ({ type, onClose }) => {
  const components = {
    'sign up': <SignUp onClose={onClose}/>,
    'login': <Login onClose={onClose}/>
  } as const;

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

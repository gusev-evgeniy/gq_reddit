import React, { FC } from 'react';
import { SignUp } from './signUp';
import { CloseButton, DialogWrapper } from './styles';

import close from '../../images/close.svg';
import Image from 'next/image';

const components = {
  'sign up': <SignUp />,
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

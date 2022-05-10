import React, { FC, useContext } from 'react';
import { CloseButton, DialogWrapper } from './styles';

import close from '../../images/close.svg';
import Image from 'next/image';
import { SignUp } from './auth/signUp';
import { Login } from './auth/login';
import { DialogContext } from '../../context/dialog';

export const Dialogs: FC = () => {
  const [dialog, setDialog] = useContext(DialogContext)!;

  if (!dialog) {
    return null;
  }

  const onClose = () => {
    !!setDialog && setDialog(undefined);
  };

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
        {components[dialog]}
      </div>
    </DialogWrapper>
  );
};

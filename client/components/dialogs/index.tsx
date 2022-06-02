import React, { FC, memo } from 'react';
import Image from 'next/image';

import { SignUp } from './auth/signUp';
import { Login } from './auth/login';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectDialog, setDialog } from '../../store/slices/dialog';

import close from '../../images/close.svg';

import { CloseButton, DialogWrapper } from './styles';

export const Dialogs: FC = memo(() => {
  const dispatch = useAppDispatch();

  const dialog = useAppSelector(selectDialog);

  if (!dialog) {
    return null;
  }

  const onClose = () => {
    dispatch(setDialog(null));
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
});

Dialogs.displayName = 'Dialogs';
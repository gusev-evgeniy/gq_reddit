import React, { useContext } from 'react';

import { DialogContext } from '../../context/dialog';
import { OutlineNavButton } from '../navigations.tsx/styles';

import { MainButton } from '../../styles';
import { StyledCommentOffer } from './styles';

export const AuthOffer = () => {
  const [, setDialog] = useContext(DialogContext)!;

  const onSignUp = () =>!!setDialog && setDialog('sign up');
  const onLogIn = () =>!!setDialog && setDialog('login');

  return (
    <StyledCommentOffer>
      <p className='offer'>Log in or sign up to leave a comment</p>
      <div className='buttons'>
        <OutlineNavButton width='80px' onClick={onLogIn}>Log In</OutlineNavButton>
        <MainButton width='80px' onClick={onSignUp}>Sign Up</MainButton>
      </div>
    </StyledCommentOffer>
  );
};

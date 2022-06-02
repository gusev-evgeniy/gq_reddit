import React from 'react';

import { OutlineNavButton } from '../navigations.tsx/styles';

import { MainButton } from '../../styles';
import { StyledCommentOffer } from './styles';
import { useAppDispatch } from '../../store/hooks';
import { setDialog } from '../../store/slices/dialog';

export const AuthOffer = () => {
  const dispatch = useAppDispatch();

  const onSignUp = () => dispatch(setDialog('sign up'));
  const onLogIn = () => dispatch(setDialog('login'));

  return (
    <StyledCommentOffer>
      <p className='offer'>Log in or sign up to leave a comment</p>
      <div className='buttons'>
        <OutlineNavButton width='80px' onClick={onLogIn}>
          Log In
        </OutlineNavButton>
        <MainButton width='80px' onClick={onSignUp}>
          Sign Up
        </MainButton>
      </div>
    </StyledCommentOffer>
  );
};

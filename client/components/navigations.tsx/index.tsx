import Image from 'next/image';
import { FC } from 'react';
import { SearchWrapper, OutlineNavButton, StyledNav, InputWithIcon } from './styles';

import logo from '../../images/logo.svg';
import profile from '../../images/user.svg';
import arrow from '../../images/arrow-down.svg';
import search from '../../images/search.svg';

import Link from 'next/link';
import { MainButton } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { setDialog } from '../../store/slices/dialog';

export const Navigation: FC = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(selectMe);

  const onSignUp = () => dispatch(setDialog('sign up'));
  const onLogIn = () => dispatch(setDialog('login'));

  return (
    <StyledNav>
      <Link href='/'>
        <a>
          <div className='logo-wrapper'>
            <Image width='35px' height='35px' src={logo} alt='logo' className='logo' />
            <span className='title'>reddit</span>
          </div>
        </a>
      </Link>
      <SearchWrapper>
        <div className='search_icon'>
          <Image width='18px' height='18px' src={search} alt='search_icon' />
        </div>
        <InputWithIcon type='text' placeholder='Search Reddit' />
      </SearchWrapper>

      <div className='buttons'>
        {!data && (
          <>
            <OutlineNavButton width='40%' onClick={onLogIn}>
              Log In
            </OutlineNavButton>
            <MainButton width='40%' onClick={onSignUp}>
              Sign Up
            </MainButton>
          </>
        )}

        <button className='user-button'>
          <Image width='18px' height='18px' src={profile} alt='user' />
          <Image width='14px' height='14px' src={arrow} alt='user_options' />
        </button>
      </div>
    </StyledNav>
  );
};

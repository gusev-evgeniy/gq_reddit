import Image from 'next/image';
import { FC, useContext } from 'react';
import { SearchWrapper, OutlineNavButton, PaintedNavButton, StyledNav, InputWithIcon } from './styles';

import logo from '../../images/logo.svg';
import profile from '../../images/user.svg';
import arrow from '../../images/arrow-down.svg';
import search from '../../images/search.svg';

import { UserContext } from '../../context/user';
import { DialogContext } from '../../context/dialog';
import Link from 'next/link';

export const Navigation: FC = () => {
  const [user] = useContext(UserContext)!;
  const [, setDialog] = useContext(DialogContext)!;

  const onSignUp = () =>!!setDialog && setDialog('sign up');
  const onLogIn = () =>!!setDialog && setDialog('login');

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
          {!user && (
            <>
              <OutlineNavButton onClick={onLogIn}>Log In</OutlineNavButton>
              <PaintedNavButton onClick={onSignUp}>Sign Up</PaintedNavButton>
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

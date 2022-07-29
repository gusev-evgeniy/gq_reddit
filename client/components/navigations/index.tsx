import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe, setMe } from '../../store/slices/me';
import { setDialog } from '../../store/slices/dialog';

import logo from '../../images/logo.svg';
import profile from '../../images/user.svg';
import arrow from '../../images/arrow-down.svg';
import search from '../../images/search.svg';

import { Ava, MainButton } from '../../styles';
import { SearchWrapper, OutlineNavButton, StyledNav, InputWithIcon } from './styles';

import { Menu } from '../contextMenu';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '../../generated/graphql';
import { applyFilter, changeFilter, setPostsDefaultState } from '../../store/slices/posts';

export const Navigation: FC = () => {
  const dispatch = useAppDispatch();

  const [coord, setCoord] = useState<{ left: number; top: number } | null>(null);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const { push } = useRouter();

  const { data: myData } = useAppSelector(selectMe);

  const [logOut] = useLogoutMutation();

  const onSignUp = () => dispatch(setDialog('sign up'));
  const onLogIn = () => dispatch(setDialog('login'));

  const onProfile = () => {
    push(`/user/${myData?.login}`);
    setCoord(null);
  };

  const onLogOut = () => {
    logOut();
    dispatch(setPostsDefaultState());
    dispatch(setMe(null));
    push('/');
    setCoord(null);
  };

  const onLoginMenu = () => {
    setCoord(null);
    onLogIn();
  };

  const openMenu = () => {
    if (coord) {
      return setCoord(null);
    }

    const { left, bottom } = buttonRef.current?.getBoundingClientRect() || {};
    setCoord({ left: left! + 15, top: bottom! + 10 });
  };

  const items = myData
    ? [
        {
          title: 'Profile',
          action: () => onProfile(),
        },
        {
          title: 'Log Out',
          action: () => onLogOut(),
        },
      ]
    : [
        {
          title: 'Sign Up or Log In',
          action: () => onLoginMenu(),
        },
      ];

  const onChangeFilter = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter(target.value));
  };

  const onApplyFilter = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      dispatch(applyFilter());
    }
  };

  const onClickLogo = () => {
    dispatch(setPostsDefaultState());
  };

  return (
    <StyledNav>
      <Link href='/'>
        <a>
          <div className='logo-wrapper' onClick={onClickLogo}>
            <Image width='35px' height='35px' src={logo} alt='logo' className='logo' />
            <span className='title'>reddit</span>
          </div>
        </a>
      </Link>

      <SearchWrapper>
        <div className='search_icon'>
          <Image width='18px' height='18px' src={search} alt='search_icon' />
        </div>
        <InputWithIcon
          type='text'
          placeholder='Search Reddit'
          onChange={onChangeFilter}
          onKeyDown={onApplyFilter}
        />
      </SearchWrapper>

      <div className='buttons'>
        {!myData && (
          <>
            <OutlineNavButton width='40%' onClick={onLogIn}>
              Log In
            </OutlineNavButton>
            <MainButton width='40%' onClick={onSignUp}>
              Sign Up
            </MainButton>
          </>
        )}

        <div onClick={openMenu} ref={buttonRef}>
          <button className='user-button'>
            {myData?.photo ? (
              <div className='ava_wrapper'>
                <Ava backgroundImage={myData.photo} />
              </div>
            ) : (
              <Image width='18px' height='18px' src={profile} alt='user' />
            )}

            <Image width='14px' height='14px' src={arrow} alt='user_options' />
          </button>
        </div>
      </div>

      {coord && <Menu {...coord} items={items} />}
    </StyledNav>
  );
};

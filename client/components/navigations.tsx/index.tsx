import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { setDialog } from '../../store/slices/dialog';

import logo from '../../images/logo.svg';
import profile from '../../images/user.svg';
import arrow from '../../images/arrow-down.svg';
import search from '../../images/search.svg';

import { MainButton } from '../../styles';
import { SearchWrapper, OutlineNavButton, StyledNav, InputWithIcon } from './styles';

import { Menu } from '../contextMenu';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '../../generated/graphql';


export const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  
  const [ logOut,  ] = useLogoutMutation();

  const [coord, setCoord] = useState<{ left: number, top: number } | null>(null); 
  
  const buttonRef = useRef<HTMLDivElement | null>(null);
  
  const { push } = useRouter();
  const { data } = useAppSelector(selectMe);

  // useEffect(() => {
  //   if (logOutData?.login) {
      
  //   }
  // }, [logOutData])

  const onSignUp = () => dispatch(setDialog('sign up'));
  const onLogIn = () => dispatch(setDialog('login'));
  const onProfile = () => {
    push(`/user/${data?.login}`);
    setCoord(null);
  };

  const onLogOut = () => {
    logOut();
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

  const items = data ? [
    {
      title: 'Profile',
      action: () => onProfile()
    },
    {
      title: 'Log Out',
      action: () => onLogOut()
    }
  ] : [
    {
      title: 'Sign Up or Log In',
      action: () => onLoginMenu()
    }
  ];

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

        <div onClick={openMenu} ref={buttonRef}>
          <button className='user-button'>
            <Image width='18px' height='18px' src={profile} alt='user' />
            <Image width='14px' height='14px' src={arrow} alt='user_options' />
          </button>
        </div>
      </div>

      {coord && <Menu { ...coord } items={items}/>}
    </StyledNav>
  );
};

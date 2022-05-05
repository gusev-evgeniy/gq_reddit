import Image from 'next/image';
import { FC, useContext } from 'react';
import { NavigationSearch, OutlineNavButton, PaintedNavButton, StyledNav } from './styles';

import logo from '../../images/logo.svg';
import profile from '../../images/user.svg';
import arrow from '../../images/arrow-down.svg';
import search from '../../images/search.svg';
import { DialogType } from '../../types/dialog';
import { UserContext } from '../../context/user';

type Props = {
  children: React.ReactChild;
  onOpenDialog: (type: DialogType) => void;
};

export const NavWrapper: FC<Props> = ({ children, onOpenDialog }) => {
  const [user] = useContext(UserContext);
  console.log('user1111', user);
  const onSignUp = () => onOpenDialog('sign up');
  const onLogIn = () => onOpenDialog('login');

  return (
    <>
      <StyledNav>
        <div className='logo-wrapper'>
          <Image width='35px' height='35px' src={logo} alt='logo' className='logo' />
          <span className='title'>reddit</span>
        </div>
        <NavigationSearch>
          <div className='search_icon'>
            <Image width='18px' height='18px' src={search} alt='search_icon' />
          </div>
          <input type='text' placeholder='Search Reddit' />
        </NavigationSearch>
        <div className='buttons'>
          {user && (
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
      {children}
    </>
  );
};

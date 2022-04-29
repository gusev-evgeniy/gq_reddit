import Image from 'next/image';
import { FC } from 'react';
import { OutlineNavButton, PaintedNavButton, StyledNav } from './styles';

import logo from '../../images/logo.svg';
import user from '../../images/user.svg';
import arrow from '../../images/arrow-down.svg';

type Props = {
  children: React.ReactChild;
};

export const NavWrapper: FC<Props> = ({ children }) => {
  return (
    <>
      <StyledNav>
        <div className='logo-wrapper'>
          <Image width='35px' height='35px' src={logo} alt='logo' className="logo"/>
          <span className='title'>reddit</span>
        </div>
        <input type="text" placeholder='Search Reddit' />
        <div className='buttons'>
          <OutlineNavButton>
            Log In
          </OutlineNavButton>
          <PaintedNavButton>
            Sign Up
          </PaintedNavButton>
          <button className='user-button'>
          <Image width='18px' height='18px' src={user} alt='logo' className="logo"/>
            <Image width='14px' height='14px' src={arrow} alt='logo' className="logo"/>
          </button>
        </div>
      </StyledNav>
      {children}
    </>
  );
};

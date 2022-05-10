import Image from 'next/image';
import React from 'react';

import arrow from '../../images/arrow-down.svg';
import { StyledSelectCommunity } from './styles';

export const SeletCommunity = () => {
  return (
    <StyledSelectCommunity>
      <div className='ava'/>
      <input type='text' placeholder='Choose a community'/>
      <div className='arrow_button'>
      <Image width='14px' height='14px' src={arrow} alt='user_options' />
      </div>
    </StyledSelectCommunity>
  );
};

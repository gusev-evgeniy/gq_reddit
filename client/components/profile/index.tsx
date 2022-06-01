import React from 'react';
import { Ava, MainButton } from '../../styles';
import { ProfileWrapper } from './styles';

export const Profile = () => {
  return (
    <ProfileWrapper>
      <div className='images'>
        <div></div>
        <div>
          <Ava />
        </div>
      </div>
      <p className='name'>u/Nick</p>
      <div className='info'>
        <div className='info_item'>
          <h6>Karma</h6>
          <p>1</p>
        </div>
        <div>
          <h6>Cake day</h6>
          <p>March 11, 2021</p>
        </div>
      </div>
      <MainButton>
        New Post
      </MainButton>
    </ProfileWrapper>
  );
};

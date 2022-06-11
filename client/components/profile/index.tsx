import React, { FC, useRef } from 'react';
import Axios from 'axios';
import Image from 'next/image';

import { MainButton } from '../../styles';
import { ProfileWrapper, UserImage } from './styles';

import add_photo from '../../images/add_photo.svg';
import { useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { GetUserQuery } from '../../generated/graphql';

export const Profile: FC<GetUserQuery['getUser']> = ({ UID, photo, email, login, updatedAt, createdAt }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { data: me } = useAppSelector(selectMe);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = inputFileRef.current?.files || [];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'photo');

      try {
        await Axios.post<any>(`http://localhost:5000/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ProfileWrapper>
      <div className='images'>
        <div className='background_image'></div>
        <div className='user_image_wrapper'>
          <UserImage backgroundImage={photo ? photo : ''}>
            <label className='upload' htmlFor='inputTag'>
              <Image width='30px' height='30px' src={add_photo} alt='add_photo' />
              <input id='inputTag' type='file' onChange={uploadImage} ref={inputFileRef} hidden />
            </label>
          </UserImage>
        </div>
      </div>
      
      <div className='data'>
        <p className='name'>u/Nick</p>
        <div className='info'>
          <div className='info_item'>
            <h6>Karma</h6>
            <p>1</p>
          </div>
          <div className='info_day'>
            <h6>Cake day</h6>
            <p>March 11, 2021</p>
          </div>
        </div>
        <MainButton width='100%'>New Post</MainButton>
      </div>
    </ProfileWrapper>
  );
};

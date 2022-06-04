import React, { useEffect, useRef, useState } from 'react';
import { MainButton } from '../../styles';
import { ProfileWrapper, UserImage } from './styles';

import add_photo from '../../images/add_photo.svg';
import Image from 'next/image';

export const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  console.log('avatarUrl', avatarUrl);
  const handleChangeImage = async () => {
    console.log('inputFileRef', inputFileRef?.current?.files);
    const [file] = inputFileRef.current?.files || [];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log('imageUrl', imageUrl);
      setAvatarUrl(imageUrl);
    }
  };

  useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <ProfileWrapper>
      <div className='images'>
        <div className='background_image'></div>
        <div className='user_image_wrapper'>
          <UserImage backgroundImage={avatarUrl}>
            <label className='upload' htmlFor='inputTag'>
              <Image width='30px' height='30px' src={add_photo} alt='add_photo' />
              <input id='inputTag' type='file' ref={inputFileRef} hidden />
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

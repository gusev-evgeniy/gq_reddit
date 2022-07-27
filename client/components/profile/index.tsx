import React, { FC, useRef } from 'react';
import Image from 'next/image';

import { MainButton } from '../../styles';
import { ProfileWrapper, UserImage } from './styles';

import add_photo from '../../images/add_photo.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { GetUserQuery, useUpdateUserMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { updateProfilePicture } from '../../store/slices/profile';

const API_KEY = 'dnm04nlu8'; // add

export const Profile: FC<GetUserQuery['getUser']> = ({ UID, photo, login, createdAt }) => {
  const dispatch = useAppDispatch();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [updateUser] = useUpdateUserMutation({
    onCompleted({ updateUser }) {
      dispatch(updateProfilePicture(updateUser.photo as string));
    },
  });

  const { data: me } = useAppSelector(selectMe);
  const { UID: myUID } = me || {};

  const isMe = UID === myUID;
  const date = dayjs(createdAt).format('MMMM D, YYYY');

  const uploadImage = async () => {
    const [file] = inputFileRef.current?.files || [];

    if (!file) {
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'reddit');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${API_KEY}/image/upload`, {
        method: 'POST',
        body: data,
      });
      const file = await res.json();
      updateUser({ variables: { photo: file.secure_url } });
    } catch (err) {
      console.log(err);
    }
  };

  const onNewPost = () => {
    router.push({
      pathname: '/submit',
    });
  };

  return (
    <ProfileWrapper>
      <div className='images'>
        <div className='background_image'></div>
        <div className='user_image_wrapper'>
          <UserImage backgroundImage={photo ? photo : ''}>
            {isMe && (
              <label className='upload' htmlFor='inputTag'>
                <Image width='30px' height='30px' src={add_photo} alt='add_photo' />
                <input id='inputTag' type='file' onChange={uploadImage} ref={inputFileRef} hidden />
              </label>
            )}
          </UserImage>
        </div>
      </div>

      <div className='data'>
        <p className='name'>u/{login}</p>
        <div className='info'>
          <div className='info_item'>
            <h6>Karma</h6>
            <p>1</p>
          </div>
          <div className='info_day'>
            <h6>Cake day</h6>
            <p>{date}</p>
          </div>
        </div>

        {isMe ? (
          <MainButton width='100%' onClick={onNewPost}>
            New Post
          </MainButton>
        ) : (
          <MainButton width='100%' onClick={() => console.log('chat')}>
            Chat
          </MainButton>
        )}
      </div>
    </ProfileWrapper>
  );
};

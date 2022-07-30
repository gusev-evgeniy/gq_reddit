import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import { Ava } from './styles';

type Props = {
  photo?: string | null;
  login?: string;
};

export const Avatar: FC<Props> = memo(({ photo, login }) => {
  const router = useRouter();

  const openProfile = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();

    if (!login || router.asPath === `/user/${login}`) {
      return;
    }

    router.push({
      pathname: '/user/[login]',
      query: { login },
    });
  };

  return (
    <div className='ava_wrapper' onClick={openProfile}>
      <Ava backgroundImage={photo ? photo : undefined}/>
    </div>
  );
});

Avatar.displayName = 'Avatar';

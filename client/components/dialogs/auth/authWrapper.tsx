import React, { FC } from 'react';

type Props = {
  children: React.ReactChild;
};

export const AuthWrapper: FC<Props> = ({ children }) => {
  return (
    <div className='sign_up'>
      <div className='image_side'></div>
      <div className='form_side'>{children}</div>
    </div>
  );
};

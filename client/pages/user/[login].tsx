import { useRouter } from 'next/router';
import React from 'react';

const Profile = () => {
  const router = useRouter();
  const { login } = router.query;

  return (
    <div>{login}</div>
  );
};

export default Profile;
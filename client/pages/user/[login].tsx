import { useRouter } from 'next/router';
import React from 'react';
import { Grid } from '../../styles';
import { Sort } from '../../components/sort';
import { Profile } from '../../components/profile';

const User = () => {
  const router = useRouter();
  const { login } = router.query;

  return (
    <Grid>
    <div>
      <Sort />
        <div>User don&apos;t have posts yeat </div>
    </div>
    <Profile />
    </Grid>
  );
};

export default User;
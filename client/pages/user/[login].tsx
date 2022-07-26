import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '../../styles';
import { Profile } from '../../components/profile';
import {
  useGetUserLazyQuery,
} from '../../generated/graphql';
import {
  selectProfile,
  setProfileDefaultState,
  setProfileUser,
} from '../../store/slices/profile';
import { useAppSelector } from '../../store/hooks';
import { Posts } from '../../components/posts';

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loaded, user } = useAppSelector(selectProfile);

  const { login } = router.query;

  const [getUser, { loading }] = useGetUserLazyQuery({
    onCompleted(data) {
      dispatch(setProfileUser(data.getUser));
    },
  });

  useEffect(() => {
    if (!loaded) {
      getUser({ variables: { login: login as string } });
    }
  }, [loaded, login]);

  useEffect(() => {
    return () => {
      dispatch(setProfileDefaultState());
    };
  }, [login]);

  if (loading || !loaded) {
    return (
      <Grid>
        <div>loading...</div>
      </Grid>
    );
  }

  return (
    <Grid>
      <Posts emptyText='User don&apos;t have posts yeat'/>
      {user && <Profile {...user} />}
    </Grid>
  );
};

export default User;

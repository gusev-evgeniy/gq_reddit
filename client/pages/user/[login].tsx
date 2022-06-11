import { useRouter } from 'next/router';
import React from 'react';

import { Grid } from '../../styles';
import { Sort } from '../../components/sort';
import { Profile } from '../../components/profile';
import { PostsEmpty } from '../../components/posts/postsEmpty';
import { useGetUserQuery } from '../../generated/graphql';

const User = () => {
  const router = useRouter();
  const { login } = router.query;

  const { data, loading, error } = useGetUserQuery({ variables: { login: login as string } });

  console.log('error', error);

  if (loading || !data?.getUser) {
    return (
      <Grid>
        <div>loading...</div>
      </Grid>
    );
  }

  return (
    <Grid>
      <div>
        <Sort />
        <PostsEmpty />
      </div>
      <Profile {...data.getUser}/>
    </Grid>
  );
};

export default User;

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '../../styles';
import { Sort } from '../../components/sort';
import { Profile } from '../../components/profile';
import { PostsEmpty } from '../../components/posts/postsEmpty';
import {
  useGetPostsLazyQuery,
  useGetPostsQuery,
  useGetUserLazyQuery,
  useGetUserQuery,
} from '../../generated/graphql';
import {
  selectProfile,
  setPostsProfile,
  setProfileDefaultState,
  setProfileUser,
} from '../../store/slices/profile';
import { useAppSelector } from '../../store/hooks';
import { StyledPostItem } from '../../components/posts/styled';
import { Post } from '../../components/posts/post';

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loaded, user, posts, sort } = useAppSelector(selectProfile);

  const { login } = router.query;

  const [getUser, { loading }] = useGetUserLazyQuery({
    onCompleted(data) {
      dispatch(setProfileUser(data.getUser));
    },
  });

  const [getPosts] = useGetPostsLazyQuery({
    onCompleted(data) {
      dispatch(setPostsProfile(data.posts));
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getUser({ variables: { login: login as string } });
    getPosts({ variables: { skip: 0, author: login as string } });
  }, [loaded]);

  useEffect(() => {
    return () => {
      dispatch(setProfileDefaultState());
    };
  }, []);

  if (loading || !loaded) {
    return (
      <Grid>
        <div>loading...</div>
      </Grid>
    );
  }

  return (
    <Grid>
      <div>
        <Sort sortedBy={sort}/>

        {!!posts && posts.length ? (
          <>
            {posts.map(post => (
              <StyledPostItem
                key={post.UID}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`post/${post.UID}`, undefined, { shallow: true })}
              >
                <Post {...post} />
              </StyledPostItem>
            ))}
          </>
        ) : (
          <PostsEmpty />
        )}
      </div>
      {user && <Profile {...user} />}
    </Grid>
  );
};

export default User;

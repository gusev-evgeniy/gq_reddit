import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Post } from '../../components/posts/post';
import { CommentForm } from '../../components/comment/commentForm';
import { Comments } from '../../components/comment/comments';
import { LargePostWrapper } from '../../components/posts/styled';
import { useGetPostLazyQuery } from '../../generated/graphql';
import { AuthOffer } from '../../components/comment/authOffer';
import { CommentsSeparator } from '../../components/comment/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { Grid } from '../../styles';
import { openPostDefault, selectOpenPost, setOpenPost } from '../../store/slices/openPost';
import { commentsDefault } from '../../store/slices/comments';

const PostPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectMe);
  const { post, loaded } = useAppSelector(selectOpenPost);

  const router = useRouter();
  const { id } = router.query;

  const [getPost, { loading, data }] = useGetPostLazyQuery();
  console.log('data', data);
  console.log('id', id);
  useEffect(() => {
    if (!loaded) {
      getPost({ variables: { uid: id as string } });
    }
  }, [loaded]);

  useEffect(() => {
    if (data?.post) {
      dispatch(setOpenPost(data?.post));
    }
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(openPostDefault());
      dispatch(commentsDefault());
    };
  }, []);

  if (loading || !loaded) {
    return (
      <Grid>
        <LargePostWrapper>
          <div className='loading'>loading...</div>
        </LargePostWrapper>
      </Grid>
    );
  }

  return (
    <Grid>
      <>
        {!!post && (
          <LargePostWrapper>
            <div className='post_wrapper'>
              <Post {...post} isLarge={true} />
            </div>

            {user.data ? <CommentForm postId={id as string} /> : <AuthOffer />}

            <CommentsSeparator />
            <Comments postId={id as string}/>
          </LargePostWrapper>
        )}
      </>
    </Grid>
  );
};

export default PostPage;

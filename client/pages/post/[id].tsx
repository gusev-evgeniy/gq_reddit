import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Post } from '../../components/posts/post';
import { CommentForm } from '../../components/comment/commentForm';
import { Comments } from '../../components/comment/comments';
import { LargePostWrapper } from '../../components/posts/styled';
import {
  useGetPostLazyQuery,
  useGetCommentsLazyQuery,
} from '../../generated/graphql';
import { AuthOffer } from '../../components/comment/authOffer';
import { CommentsSeparator } from '../../components/comment/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { Grid } from '../../styles';
import { selectOpenPost, setComments, setOpenPost } from '../../store/slices/openPost';

const PostPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectMe);
  const { post, loaded, comments } = useAppSelector(selectOpenPost);

  const router = useRouter();
  const { id } = router.query;

  const [getPost, { loading, data, error }] = useGetPostLazyQuery();

  const [getComments, { data: response }] = useGetCommentsLazyQuery();

  useEffect(() => {
    if (!loaded) {
      console.log('2222');
      getPost({ variables: { uid: id as string } });
      getComments({ variables: { post: { UID: id as string } } });
    }
  }, [loaded]);

  useEffect(() => {
    if (data?.post) {
      dispatch(setOpenPost(data?.post));
    }
  }, [data]);

  useEffect(() => {
    const items = response?.getComments.items;

    if (items) {
      dispatch(setComments(items));
    }
  }, [response]);

  if (loading || !loaded) {
    return (
      <Grid>
        <LargePostWrapper>
          <div className='loading'>loading...</div>
        </LargePostWrapper>
      </Grid>
    );
  }
  console.log('post', post);
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
            <Comments comments={comments} />
          </LargePostWrapper>
        )}
      </>
    </Grid>
  );
};

export default PostPage;

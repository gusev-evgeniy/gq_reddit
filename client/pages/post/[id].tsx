import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Post } from '../../components/posts/post';
import { CommentForm } from '../../components/comment/commentForm';
import { Comments } from '../../components/comment/comments';
import { LargePostWrapper } from '../../components/posts/styled';
import { useGetPostQuery, VoteMutation } from '../../generated/graphql';
import { AuthOffer } from '../../components/comment/authOffer';
import { CommentsSeparator } from '../../components/comment/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { Grid } from '../../styles';
import { openPostDefault, selectOpenPost, setOpenPost, updateOpenPost } from '../../store/slices/openPost';
import { commentsDefault } from '../../store/slices/comments';

const PostPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectMe);
  const { post, loaded } = useAppSelector(selectOpenPost);

  const router = useRouter();
  const { id } = router.query;

  const { loading } = useGetPostQuery({
    onCompleted(data) {
      dispatch(setOpenPost(data?.post));
    },
    variables: { uid: id as string },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    return () => {
      dispatch(openPostDefault());
      dispatch(commentsDefault());
    };
  }, []);

  const onLikePost = (vote: VoteMutation['vote']) => {
    dispatch(updateOpenPost(vote));
  };

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
              <Post {...post} isLarge={true} onLikePost={onLikePost} />
            </div>

            {user.data ? <CommentForm postId={id as string} /> : <AuthOffer />}

            <CommentsSeparator />
            <Comments postId={id as string} />
          </LargePostWrapper>
        )}
      </>
    </Grid>
  );
};

export default PostPage;

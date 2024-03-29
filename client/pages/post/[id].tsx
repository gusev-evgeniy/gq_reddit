import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { selectMe } from '../../store/slices/me';
import { openPostDefault, selectOpenPost, setOpenPost, updateOpenPost } from '../../store/slices/openPost';
import { commentsDefault } from '../../store/slices/comments';

import { Post } from '../../components/posts/post';
import { CommentForm } from '../../components/comments/commentForm';
import { Comments } from '../../components/comments';
import { LargePostWrapper } from '../../components/posts/styled';
import { AuthOffer } from '../../components/comments/authOffer';

import { PostVoteMutation, useGetPostLazyQuery } from '../../generated/graphql';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { CommentsSeparator, StyledPostCommentForm } from '../../components/comments/styles';
import { Grid } from '../../styles';
import { PostSkeleton } from '../../components/posts/skeleton';

const PostPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectMe);
  const { post, loaded } = useAppSelector(selectOpenPost);

  const router = useRouter();
  const { id } = router.query;

  const [getPost, { loading }] = useGetPostLazyQuery({
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

  useEffect(() => {
    if (!loaded) getPost();
  }, [loaded]);

  const onLikePost = (vote: PostVoteMutation['votePost']) => {
    dispatch(updateOpenPost(vote));
  };

  if (loading || !loaded) {
    return (
      <Grid>
        <LargePostWrapper>
          <div className='post_wrapper'>
            <PostSkeleton isLarge={true} />
          </div>
          <StyledPostCommentForm>
            <CommentForm postId={id as string} />
          </StyledPostCommentForm>
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

            {user.data ? (
              <StyledPostCommentForm>
                <CommentForm postId={id as string} />
              </StyledPostCommentForm>
            ) : (
              <AuthOffer />
            )}

            <CommentsSeparator />
            <Comments postId={id as string} />
            <div className='bottom'></div>
          </LargePostWrapper>
        )}
      </>
    </Grid>
  );
};

export default PostPage;

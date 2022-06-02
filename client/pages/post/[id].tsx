import { useRouter } from 'next/router';
import React, {  useEffect, useState } from 'react';

import { Post } from '../../components/posts/post';
import { CommentForm } from '../../components/comment/commentForm';
import { Comments } from '../../components/comment/comments';
import { LargePostWrapper } from '../../components/posts/styled';
import { useGetPostQuery, useGetCommentsQuery } from '../../generated/graphql';
import { AuthOffer } from '../../components/comment/authOffer';
import { CommentsSeparator } from '../../components/comment/styles';
import { CommentsType } from '../../types/comment';
import { useAppSelector } from '../../store/hooks';
import { selectMe } from '../../store/slices/me';
import { Grid } from '../../styles';

const PostPage = () => {
  const [comments, setComments] = useState<CommentsType>([]);

  const user = useAppSelector(selectMe);

  const router = useRouter();
  const { id } = router.query;

  const { loading, data, error } = useGetPostQuery({
    variables: { uid: id as string },
  });

  const { data: response } = useGetCommentsQuery({
    variables: { post: { UID: id as string } },
  });

  useEffect(() => {
    const items = response?.getComments.items;

    if (items) {
      setComments(prev => [...prev, ...items]);
    }
  }, [response]);

  const { post } = data || {};

  if (loading) {
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
            <Comments comments={comments} />
          </LargePostWrapper>
        )}
      </>
    </Grid>
  );
};

export default PostPage;

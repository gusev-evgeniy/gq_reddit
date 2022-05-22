import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { Post } from '../../components/posts/post';
import { CommentForm } from '../../components/comment/commentForm';
import { Comments } from '../../components/comment/comments';
import { LargePostWrapper } from '../../components/posts/styled';
import { useGetPostQuery } from '../../generated/graphql';
import { AuthOffer } from '../../components/comment/authOffer';
import { CommentsSeparator } from '../../components/comment/styles';
import { UserContext } from '../../context/user';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user] = useContext(UserContext)!;

  const { loading, data, error } = useGetPostQuery({
    variables: { uid: id as string },
  });
  const { post } = data || {};

  if (loading) {
    return (
      <div className='container'>
        <LargePostWrapper><div className='loading'>loading...</div></LargePostWrapper>
      </div>
    );
  }

  return (
    <div className='container'>
      {!!post && (
        <LargePostWrapper>
          <div className='post_wrapper'>
            <Post {...post} isLarge={true} />
          </div>
          {user ? <CommentForm /> : <AuthOffer />}
          <CommentsSeparator />
          <Comments />
        </LargePostWrapper>
      )}
    </div>
  );
};

export default PostPage;

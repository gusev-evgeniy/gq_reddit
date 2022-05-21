import { useRouter } from 'next/router';
import React from 'react';

import { Post } from '../../components/posts/post';
import { useGetPostQuery } from '../../generated/graphql';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, data, error } = useGetPostQuery({
    variables: { uid: id as string }
  });
  const { post } = data || {};
  
  console.log(data);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className='container'>
      {!!post && <Post {...post} isLarge={true}/>}
    </div>
  );
};

export default PostPage;
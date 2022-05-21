import { useRouter } from 'next/router';
import React from 'react';
import { useGetPostsQuery } from '../../generated/graphql';
import { Post } from './post';
import { StyledPostItem } from './styled';

export const Posts = () => {
  const router = useRouter();

  const { loading, data, error } = useGetPostsQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  //TODO temporary. remove Link.
  return (
    <>
      {data?.posts.items.map(post => (
          <StyledPostItem style={{cursor: "pointer"}} key={post.UID} onClick={() => router.push(`post/${post.UID}`)}>
            <Post {...post} />
          </StyledPostItem>
      ))}
    </>
  );
};

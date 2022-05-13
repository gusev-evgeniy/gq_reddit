import React from 'react';
import { useGetPostQuery } from '../../generated/graphql';
import { Post } from './post';

export const Posts = () => {
  const { loading, data, error } = useGetPostQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('data', data);

  return (
    <>
  {data?.getPost.items.map((post) => (
    <Post key={post.UID} {...post}/>
  ))}
    </>
  );
};

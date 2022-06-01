import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GetPostsQuery, useGetPostsLazyQuery } from '../../generated/graphql';
import { Post } from './post';
import { StyledPostItem } from './styled';
import { useDebouncedCallback } from 'use-debounce';

export const Posts = () => {
  const [position, setPosition] = useState(0);
  const [posts, setPosts] = useState<GetPostsQuery['posts']['items']>([]);
  const [skip, setSkip] = useState(0);

  const router = useRouter();

  const [getPosts, { loading, data, error }] = useGetPostsLazyQuery();

  useLayoutEffect(() => {
    getPosts({ variables: { skip } });
  }, []);

  useEffect(() => {
    if (data?.posts) {
      setPosts(prev => [...prev, ...data.posts.items]);
      setSkip(prev => prev + data.posts.items.length);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);

    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  useEffect(() => {
    if (position >= 100 - 30) {
      getPosts({ variables: { skip } });
    }
  }, [position]);

  const listenToScroll = useDebouncedCallback(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = Math.ceil((winScroll / height) * 100);
    setPosition(scrolled);
  }, 500);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <StyledPostItem
          key={post.UID}
          style={{ cursor: 'pointer' }}
          onClick={() => router.push(`post/${post.UID}`)}
        >
          <Post {...post} />
        </StyledPostItem>
      ))}
    </div>
  );
};

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetPostsLazyQuery } from '../../generated/graphql';
import { Post } from './post';
import { StyledPostItem } from './styled';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPosts, setPosts } from '../../store/slices/posts';

export const Posts = () => {
  const dispatch = useAppDispatch();

  const [position, setPosition] = useState(0);

  const { items, loaded, skip } = useAppSelector(selectPosts);
  const router = useRouter();

  const [getPosts, { loading, data, called, refetch }] = useGetPostsLazyQuery();

  useEffect(() => {
    if (!loaded) {
      if (called) {
        refetch({ skip });
      } else {
        getPosts({ variables: { skip } });
      }
    }
  }, [loaded]);

  useEffect(() => {
    if (data?.posts ) {
      dispatch(setPosts(data.posts.items));
    }
  }, [data, dispatch]);

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

  if (loading || !loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {items.map(post => (
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

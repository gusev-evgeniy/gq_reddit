import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useGetPostsLazyQuery } from '../../generated/graphql';
import { Post } from './post';
import { StyledPostItem } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPosts, setPosts } from '../../store/slices/posts';

export const Posts = () => {
  const dispatch = useAppDispatch();

  const { items, loaded, skip, totalCount } = useAppSelector(selectPosts);
  const router = useRouter();

  const [getPosts, { loading, data, called, refetch }] = useGetPostsLazyQuery();

  useEffect(() => {
    if (!loaded) {
      if (called) refetch({ skip });
      else getPosts({ variables: { skip } });
    }
  }, [loaded]);

  useEffect(() => {
    if (data?.posts) {
      dispatch(setPosts(data.posts));
    }
  }, [data, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  const listenToScroll = useDebouncedCallback(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = Math.ceil((winScroll / height) * 100);
    if (scrolled >= 90 && items.length < totalCount) {
        refetch({ skip });
      }
  }, 300);

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

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useGetPostsLazyQuery } from '../../generated/graphql';
import { Post } from './post';
import { StyledPostItem } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSort, PostState, selectPosts, setPosts } from '../../store/slices/posts';
import { Sort } from '../sort';

export const Posts = () => {
  const dispatch = useAppDispatch();

  const { items, loaded, totalCount, sort, filter } = useAppSelector(selectPosts);
  const router = useRouter();

  const [getPosts, { loading }] = useGetPostsLazyQuery({
    onCompleted(data) {
      dispatch(setPosts(data.posts));
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!loaded) {
      getPosts({ variables: { skip: 0, sort, filter } });
    }
  }, [loaded]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  const onChangeSort = (sort: PostState['sort']) => {
    dispatch(changeSort(sort));
  };

  const listenToScroll = useDebouncedCallback(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = Math.ceil((winScroll / height) * 100);
    if (scrolled >= 90 && items.length < totalCount) {
      getPosts({ variables: { skip: items.length, sort, filter } });
    }
  }, 300);

  return (
    <div>
      <Sort sortedBy={sort} onChange={onChangeSort} />

      {loading || !loaded ? (
        <div>Loading...</div>
      ) : (
        <>
          {items.map(post => (
            <StyledPostItem
              key={post.UID}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`post/${post.UID}`)}
            >
              <Post {...post} />
            </StyledPostItem>
          ))}
        </>
      )}
    </div>
  );
};

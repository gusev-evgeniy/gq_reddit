import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { PostVoteMutation, useGetPostsLazyQuery } from '../../generated/graphql';
import { Post } from './post';
import { PostRatingWrapper, StyledPostHeader, StyledPostItem, VoteButton } from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeSort,
  postLoaded,
  PostState,
  selectPosts,
  setPosts,
  setPostsDefaultState,
  updatePost,
} from '../../store/slices/posts';
import { Sort } from '../sort';
import { PostsEmpty } from './postsEmpty';
import Image from 'next/image';

import thumb_up from '../../images/thumb_up.svg';
import thumb_down from '../../images/thumb_down.svg';
import { PostHeader } from './post/postHeader';
import { Avatar } from '../avatar';
import { PostFooter } from './post/postFooter';
import { PostSkeleton } from './skeleton';

type Props = {
  emptyText: string;
  author?: string;
};

export const Posts: FC<Props> = ({ emptyText, author }) => {
  const dispatch = useAppDispatch();

  const { items, loaded, totalCount, sort, filter } = useAppSelector(selectPosts);
  const router = useRouter();

  const [getPosts, { loading, refetch }] = useGetPostsLazyQuery({
    onCompleted(data) {
      dispatch(setPosts(data.posts));
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!loaded) {
      getPosts({ variables: { skip: 0, sort, filter, author } });
      dispatch(postLoaded());
    }
  }, [loaded]);

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => {
      window.removeEventListener('scroll', listenToScroll);

      dispatch(setPostsDefaultState());
    };
  }, []);

  const onChangeSort = (sort: PostState['sort']) => {
    dispatch(changeSort(sort));
  };

  const onLikePost = (vote: PostVoteMutation['votePost']) => {
    dispatch(updatePost(vote));
  };

  const listenToScroll = useDebouncedCallback(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = Math.ceil((winScroll / height) * 100);
    if (scrolled >= 90 && items.length < totalCount) {
      refetch({ skip: items.length });
    }
  }, 300);

  if (loading || !loaded) {
    return (
      <div>
        <Sort sortedBy={sort} onChange={onChangeSort} />

        {Array(5).fill(undefined).map((_, index) => (
          <StyledPostItem key={index}>
            <PostSkeleton/>
          </StyledPostItem>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Sort sortedBy={sort} onChange={onChangeSort} />

      {!!items && items.length ? (
        <>
          {items.map(post => (
            <StyledPostItem
              key={post.UID}
              style={{ cursor: 'pointer' }}
              onClick={() => router.replace(`/post/${post.UID}`)}
            >
              <Post {...post} onLikePost={onLikePost} />
            </StyledPostItem>
          ))}
        </>
      ) : (
        <PostsEmpty text={emptyText} />
      )}
    </div>
  );
};

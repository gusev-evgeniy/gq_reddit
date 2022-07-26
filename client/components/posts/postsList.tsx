import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { VoteMutation } from '../../generated/graphql';
import { StyledPostItem } from './styled';
import { useAppDispatch } from '../../store/hooks';
import { changeSort, PostState, updatePost } from '../../store/slices/posts';
import { Sort } from '../sort';
import { Post } from './post';
import { PostsEmpty } from './postsEmpty';

type Props = {
  loading: boolean;
  items: PostState['items'];
  sort: PostState['sort'];
  emptyText: string;
};

export const PostsList: FC<Props> = ({ loading, items, sort, emptyText }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onChangeSort = (sort: PostState['sort']) => {
    dispatch(changeSort(sort));
  };

  const onLikePost = (vote: VoteMutation['vote']) => {
    dispatch(updatePost(vote));
  };

    if (loading ) {
    return (
        <div>loading...</div>
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
                <Post {...post} onLikePost={onLikePost}/>
              </StyledPostItem>
            ))}
          </>
        ) : (
          <PostsEmpty text={emptyText}/>
        )}
    </div>
  );
};

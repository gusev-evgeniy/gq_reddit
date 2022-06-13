import PostEntity from '../../entities/Post';

export type GetPostsAndCountProps = {
  filter: string;
  sort: 'new' | 'best';
  author: string;
  skip: number;
}

export const getPostsAndCount = async <GetPostsAndCountProps>({ filter, sort, author, skip }) => {
  let query = PostEntity.createQueryBuilder('post')
    .take(10)
    .skip(skip || 0)
    .leftJoinAndSelect('post.author', 'author');

  if (filter) {
    query
      .where(`post.title like :filter`, { filter: `%${filter}%` })
      .orWhere(`post.block ::jsonb @> \'{"data.text":"${filter}"}\'`);
  }

  if (author) {
    query.where(`author.login = :author`, { author });
  }

  if (!sort || sort === 'new') {
    query.orderBy('post.createdAt', 'DESC');
  }

  if (sort === 'best') {
    query.orderBy('post.votesCount', 'DESC');
  }

  return await query.getManyAndCount();
};

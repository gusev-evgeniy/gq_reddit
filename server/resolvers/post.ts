import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import PostEntity from '../entities/Post';
import VoteEntity from '../entities/VotePost';

import AuthMiddleware from '../middleware/auth';
import { MyContext } from '../type';
import { getDataFromJWT } from '../utils/auth';
import { extendsEntityByMyVote, vote } from '../utils/vote';
import { getPostsAndCount } from '../utils/query/posts';
import { Block } from './graphTypes';

@ObjectType()
class GetPostResponse {
  @Field(type => [PostEntity])
  items: PostEntity[];

  @Field(type => Number)
  totalCount: number;
}

@InputType()
class VotePostInput extends PostEntity {
  @Field()
  UID: string;
}

@Resolver()
export default class Post {
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => PostEntity)
  async createPost(
    @Arg('title', { nullable: false }) title: string,
    @Arg('block', () => [Block], { nullable: true }) block: [Block],
    @Ctx() { res }: MyContext
  ) {
    if (!title) {
      throw new Error('Title required');
    }

    try {
      const obj = {
        title,
        author: res.locals.user,
        block,
      };

      const post = PostEntity.create(obj);
      await post.save();

      return post;
    } catch (error) {
      console.log('error', error);
    }
  }

  @UseMiddleware(AuthMiddleware)
  @Mutation(() => PostEntity, { nullable: true })
  async votePost(
    @Arg('value', { nullable: false }) value: number,
    @Arg('postUID', { nullable: false }) postUID: VotePostInput,
    @Ctx() { res }: MyContext
  ) {
    return await vote(res.locals.user, value, postUID, true);
  }

  @Query(() => GetPostResponse)
  async posts(
    @Arg('skip') skip: number,
    @Arg('filter', { nullable: true }) filter: string,
    @Arg('author', { nullable: true }) author: string,
    @Arg('sort', { nullable: true }) sort: 'new' | 'best',
    @Ctx() { req }: MyContext
  ) {
    try {
      let [items, totalCount] = await getPostsAndCount({ filter, author, sort, skip });
      const { UID } = getDataFromJWT(req.cookies.token) || {};

      if (UID) {
        items = await extendsEntityByMyVote(items, UID);
      }

      return { items, totalCount };
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => PostEntity, { nullable: true })
  async post(@Arg('UID', { nullable: false }) UID: string, @Ctx() { req }: MyContext) {
    try {
      const post = await PostEntity.findOne({
        where: { UID },
        relations: ['author'],
      });

      if (post?.votesCount !== 0) {
        const { UID: userId } = getDataFromJWT(req.cookies.token) || {};
  
        const vote = await VoteEntity.findOne({
          where: { postId: UID, userId },
        });

        if (vote) {
          post.myVote = vote.value
        }
      }


      return post;
    } catch (error) {
      console.log('error', error);
    }
  }
}

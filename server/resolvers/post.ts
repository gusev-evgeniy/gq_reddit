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
import VoteEntity from '../entities/Vote';

import AuthMiddleware from '../middleware/auth';
import { MyContext } from '../type';
import { getDataFromJWT } from '../utils/auth';
import { extendsPostsByMyVote } from '../utils/post';
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
  async vote(
    @Arg('value', { nullable: false }) value: number,
    @Arg('postUID', { nullable: false }) postUID: VotePostInput,
    @Ctx() { res }: MyContext
  ) {
    try {
      const correctValue = value > 0 ? 1 : -1;

      console.log('res.locals.user.UID', res.locals.user.UID)
      let userVote = await VoteEntity.findOneBy({ userId: res.locals.user.UID, postId: postUID.UID });
      let post = await PostEntity.findOneBy({ UID: postUID.UID });
      let myVote = correctValue;

      if (userVote) {
        if (userVote.value !== correctValue) {
          userVote.value = correctValue;
          await userVote.save();

          post.votesCount += correctValue * 2;
        } else {
          await userVote.remove();

          myVote = null;
          post.votesCount -= correctValue;
        }
      } else {
        const newVote = VoteEntity.create({
          postId: postUID.UID,
          userId: res.locals.user.UID,
          value: correctValue,
          post: postUID,
          user: res.locals.user,
        });
        await newVote.save();

        post.votesCount += correctValue;
      }
      await post.save();

      post.myVote = myVote;

      return post;
    } catch (error) {
      console.log('error', error);
    }
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

      const { UID } = getDataFromJWT(req) || {};

      if (UID) {
        items = await extendsPostsByMyVote(items, UID);
      }
      
      return { items, totalCount };
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => PostEntity, { nullable: true })
  async post(@Arg('UID', { nullable: false }) UID: string) {
    try {
      return await PostEntity.findOne({
        where: { UID },
        relations: ['author'],
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}

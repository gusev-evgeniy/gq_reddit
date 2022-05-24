import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import PostEntity from '../entities/Post';
import AuthMiddleware from '../middleware/auth';
import { MyContext } from '../type';
import { Block } from './types';

@ObjectType()
class OffersResponse {
  @Field(type => [PostEntity])
  items: PostEntity[];

  @Field(type => Number)
  totalCount: number;
}

@ObjectType()
class GetPostResponse {
  @Field(type => PostEntity)
  items: PostEntity;
}

@Resolver()
export default class Post {
  @UseMiddleware(AuthMiddleware)
  @Mutation(() => PostEntity)
  async createPost(
    @Arg('title', { nullable: false }) title: string,
    @Arg('block', () => [Block], { nullable: true }) block: Block[],
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
      console.log('obj', obj);
      const post = PostEntity.create(obj);
      await post.save();

      return post;
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => OffersResponse)
  async posts() {
    try {
      const [items, totalCount] = await PostEntity.findAndCount({
        order: { createdAt: 'DESC' },
        relations: ['author']
      });
      console.log('items', items)
      console.log('totalCount', totalCount)
      return { items, totalCount };
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => PostEntity, { nullable: true })
  async post(
    @Arg('UID', { nullable: false }) UID: string,
  ) {
    try {
      return await PostEntity.findOne({
        where: { UID },
        relations: ['author']
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}

import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import CommentEntity from '../entities/Comment';
import Post from '../entities/Post';
import User from '../entities/User';
import Auth from '../middleware/auth';
import { MyContext } from '../type';
import { Block } from './types';

@ObjectType()
class OffersResponse {
  @Field(type => [CommentEntity])
  items: CommentEntity[];

  @Field(type => Number)
  totalCount: number;
}

@Resolver()
export default class Comment {
  @UseMiddleware(Auth)
  @Mutation(() => String)
  async createComment(
    @Arg('block', () => [Block], { nullable: false }) block: Block[],
    @Arg('post', () => Post, { nullable: false }) post: Post,
    @Ctx() { res }: MyContext
  ) {
    try {
      const comment = CommentEntity.create({ block, author: res.locals.user, post });
      await comment.save();

      return 'Success';
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }

  @Query(() => [OffersResponse])
  async getComments(
    @Arg('post', () => Post, { nullable: true }) post: Post,
    @Arg('author', () => User, { nullable: true }) author: User,
  ) {
    try {
      const where: any = {};

      if (post) where.post = post;
      if (author) where.author = author;

      const [items, totalCount] = await CommentEntity.findAndCount({
        where,
        order: { createdAt: 'DESC' },
        relations: ['author']
      });

      return { items, totalCount };
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }
}

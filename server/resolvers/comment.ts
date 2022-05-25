import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import CommentEntity from '../entities/Comment';
import Post from '../entities/Post';
import User from '../entities/User';
import Auth from '../middleware/auth';
import { MyContext } from '../type';
import { Block } from './types';

@ObjectType()
class CommentsResponse {
  @Field(type => [CommentEntity])
  items: CommentEntity[];

  @Field(type => Number)
  totalCount: number;
}

@InputType()
class PostInput extends Post {
  @Field()
  UID: string;
};

@InputType()
class UserInput extends User {
  @Field()
  UID: string;
};

@Resolver()
export default class Comment {

  @UseMiddleware(Auth)
  @Mutation(() => String)
  async createComment(
    @Arg('block', () => [Block], { nullable: false }) block: [Block],
    @Arg('post', { nullable: false }) post: PostInput,
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

  @Query(() => CommentsResponse)
  async getComments(
    @Arg('post', () => PostInput, { nullable: true }) post: PostInput,
    @Arg('author', () => UserInput, { nullable: true }) author: UserInput,
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

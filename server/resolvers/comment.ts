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
import CommentEntity from '../entities/Comment';
import PostEntity from '../entities/Post';
import Post from '../entities/Post';
import User from '../entities/User';
import Auth from '../middleware/auth';
import { MyContext } from '../type';
import { Block } from './types';
import AppDataSource from '../data-source';
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
}

@InputType()
class UserInput extends User {
  @Field()
  UID: string;
}

@Resolver()
export default class Comment {
  @UseMiddleware(Auth)
  @Mutation(() => String)
  async createComment(
    @Arg('block', () => [Block], { nullable: false }) block: [Block],
    @Arg('post', { nullable: false }) post: PostInput,
    @Ctx() { res }: MyContext
  ) {
    // const queryRunner = AppDataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    try {
      const comment = CommentEntity.create({ block, author: res.locals.user, post });
      await comment.save();

      await PostEntity.createQueryBuilder()
        .update('post')
        .set({ commentsCount: () => '"commentsCount" + 1' })
        .where('UID = :UID', { UID: post.UID })
        .execute();
      // await queryRunner.commitTransaction();

      return 'Success';
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }

  @Query(() => CommentsResponse)
  async getComments(
    @Arg('post', () => PostInput, { nullable: true }) post: PostInput,
    @Arg('author', () => UserInput, { nullable: true }) author: UserInput
  ) {
    try {
      const where: any = {};

      if (post) where.post = post;
      if (author) where.author = author;

      const [items, totalCount] = await CommentEntity.findAndCount({
        where,
        order: { createdAt: 'DESC' },
        relations: ['author'],
      });

      return { items, totalCount };
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }
}

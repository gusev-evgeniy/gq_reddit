import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import CommentEntity from '../entities/Comment';
import PostEntity from '../entities/Post';
import Auth from '../middleware/auth';
import { MyContext } from '../type';
import { vote } from '../utils/query/vote';
import AuthMiddleware from '../middleware/auth';
import { getComments } from '../utils/query/comment';
import { CommentCreateResponse, CommentInput, CommentsResponse, PostInput, UserInput } from './graphTypes';
import { getManager } from 'typeorm';

@Resolver()
export default class Comment {
  @UseMiddleware(Auth)
  @Mutation(() => CommentCreateResponse)
  async createComment(
    @Arg('text', { nullable: false }) text: string,
    @Arg('post', { nullable: false }) post: PostInput,
    @Arg('parent', { nullable: true }) parent: CommentInput,
    @Ctx() { req, res }: MyContext
  ) {
    try {
      const objCreate: Partial<CommentEntity> = {
        text,
        author: res.locals.user,
      };

      if (parent) objCreate.parent = parent;
      else objCreate.post = post;

      const comment = CommentEntity.create(objCreate);
      await comment.save();

      const updatedPost = await PostEntity.createQueryBuilder()
        .update('post')
        .set({ commentsCount: () => '"commentsCount" + 1' })
        .where('UID = :UID', { UID: post.UID })
        .returning('*')
        .updateEntity(true)
        .execute();

      if (parent) {
        await CommentEntity.createQueryBuilder()
          .update('comment')
          .set({ isEmpty: () => 'false' })
          .where('UID = :UID', { UID: parent.UID })
          .updateEntity(true)
          .execute();
      }

      const { commentsCount } = updatedPost.raw[0] as PostEntity;

      const where: Partial<CommentEntity> = {};

      if (parent) where.parent = parent;
      else if (post) where.post = post;

      const items = await getComments({ where, req });

      return { items, parent: parent?.UID || null, post: post?.UID || null, commentsCount };
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }

  @Query(() => CommentsResponse)
  async getComments(
    @Arg('post', () => PostInput, { nullable: true }) post: PostInput,
    @Arg('author', () => UserInput, { nullable: true }) author: UserInput,
    @Arg('parent', { nullable: true }) parent: CommentInput,

    @Ctx() { req }: MyContext
  ) {
    try {
      const where: Partial<CommentEntity> = {};

      if (author) where.author = author;

      if (parent) where.parent = parent;
      else if (post) where.post = post;

      const items = await getComments({ where, req });
      console.log('items', items)
      return { items, post: post?.UID || null, parent: parent?.UID || null};
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }

  @UseMiddleware(AuthMiddleware)
  @Mutation(() => CommentEntity, { nullable: true })
  async voteComment(
    @Arg('value', { nullable: false }) value: number,
    @Arg('commentUID', { nullable: false }) commentUID: PostInput,
    @Ctx() { res }: MyContext
  ) {
    return await vote(res.locals.user, value, commentUID, false);
  }
}

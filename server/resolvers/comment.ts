import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import CommentEntity from '../entities/Comment';
import PostEntity from '../entities/Post';
import Auth from '../middleware/auth';
import { MyContext } from '../type';
import {  vote } from '../utils/query/vote';
import AuthMiddleware from '../middleware/auth';
import { getComments } from '../utils/query/comment';
import { CommentCreateResponse, CommentInput, CommentsResponse, PostInput, UserInput } from './graphTypes';

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

      console.log('parent', parent)
      
      const comment = CommentEntity.create({ text, author: res.locals.user, post, parent });
      await comment.save();

      const updatedPost = await PostEntity.createQueryBuilder()
        .update('post')
        .set({ commentsCount: () => '"commentsCount" + 1' })
        .where('UID = :UID', { UID: post.UID })
        .returning('*')
        .updateEntity(true)
        .execute();

      const { UID } = updatedPost.raw[0] as PostEntity;
      const where = { post: { UID } };

      return await getComments({ where, req });
    } catch (error) {
      console.log('error', error);
      return 'Error';
    }
  }

  @Query(() => CommentsResponse)
  async getComments(
    @Arg('post', () => PostInput, { nullable: true }) post: PostInput,
    @Arg('author', () => UserInput, { nullable: true }) author: UserInput,
    @Ctx() { req }: MyContext
  ) {
    try {
      const where: any = {};

      if (post) where.post = post;
      if (author) where.author = author;

      return await getComments({ where, req });
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

import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import PostEntity, { PostInterface } from '../entities/Post';
import AuthMiddleware from '../middleware/auth';
import { MyContext } from "../type";

@Resolver()
export default class Post {

  @UseMiddleware(AuthMiddleware)
  @Mutation(() => PostEntity)
  async createPost(
    @Arg('title',{ nullable: false }) title: string,
    @Arg('text') text: string,
    @Ctx() { res }: MyContext
  ) {
    if (!title) {
      throw new Error( "Title required")
    } 

    try {
      const obj: PostInterface = {
        title,
        author: res.locals.user
      }

      if (text) obj.text = text;
      const post = PostEntity.create(obj);
      await post.save()

      return 
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => [PostEntity])
 async getPost() {
   try {
     const posts = await PostEntity.findAndCount();
     return posts;
   } catch (error) {
    console.log('error', error);
   }
 }
}
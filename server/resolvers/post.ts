import { Arg, Ctx, Field, InputType, InterfaceType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";

import PostEntity from '../entities/Post';
import AuthMiddleware from '../middleware/auth';
import { MyContext } from "../type";

@InputType()
class Data {
  @Field()
  text: string;
}

@InputType()
abstract class Block {
  @Field()
  id?: string;

  @Field(() => Data)
  data: Data;

  @Field()
  type: string;
}

@ObjectType()
class OffersResponse {
  @Field(type => [PostEntity])
  items: PostEntity[]

  @Field(type => Number)
  totalCount: number
}

@Resolver()
export default class Post {

  @UseMiddleware(AuthMiddleware)
  @Mutation(() => String)
  async createPost(
    @Arg('title',{ nullable: false }) title: string,
    @Arg('block', () => [Block], { nullable: true }) block: Block[],
    @Ctx() { res }: MyContext
  ) {
    if (!title) {
      throw new Error( "Title required")
    } 

    try {
      const obj = {
        title,
        author: res.locals.user,
        block
      }
      console.log('obj', obj)
      const post = PostEntity.create(obj);
      await post.save()

      return "Success"
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => OffersResponse)
 async getPost() {
   try {
     const [items, totalCount] = await PostEntity.findAndCount();

     return { items, totalCount };
   } catch (error) {
    console.log('error', error);
   }
 }
}
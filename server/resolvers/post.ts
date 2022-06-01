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
import { In } from 'typeorm';

import PostEntity from '../entities/Post';
import VoteEntity from '../entities/Vote';
import AuthMiddleware from '../middleware/auth';
import { MyContext } from '../type';
import { getDataFromJWT } from '../utils/auth';
import { Block } from './types';

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
  @Mutation(() => String)
  async vote(
    @Arg('value', { nullable: false }) value: number,
    @Arg('postUID', { nullable: false }) postUID: VotePostInput,
    @Ctx() { res }: MyContext
  ) {
    try {
      const correctValue = value > 0 ? 1 : -1;

      let userVote = await VoteEntity.findOneBy({ userId: res.locals.user.UID, postId: postUID.UID });
      let post = await PostEntity.findOneBy({ UID: postUID.UID });
      console.log('userVote', userVote);

      if (userVote) {
        if (userVote.value !== correctValue) {
          userVote.value = correctValue;
          await userVote.save();

          post.votesCount += correctValue * 2;
        } else {
          await userVote.remove()

          post.votesCount -= correctValue;
        }

      } else if (!userVote) {
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

      return 'Success';
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(() => GetPostResponse)
  async posts(@Ctx() { req }: MyContext) {
    try {
      let [items, totalCount] = await PostEntity.findAndCount({
        order: { createdAt: 'DESC' },
        relations: ['author'],
      });

      const { UID } = getDataFromJWT(req) || {};

      if (UID) {
        const postUIDs = items.map(({ UID }) => UID);
        console.log('postUIDs', postUIDs);

        const votes = await VoteEntity.find({
          where: { postId: In(postUIDs), userId: UID },
        });

        const objVotes = votes.reduce<{ [key: string]: number }>((acc, { postId, value }) => {
          acc[postId] = value;

          return acc;
        }, {});

        // items = items.map(item => objVotes[item.UID] ? {...item, myVote: objVotes[item.UID]} : item)
        items = items.map(item => {
          if (objVotes[item.UID]) {
            item.myVote = objVotes[item.UID];
          }
          return item;
        });
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

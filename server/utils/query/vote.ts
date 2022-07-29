import { In } from 'typeorm';
import PostEntity from '../../entities/Post';
import VoteEntity from '../../entities/VotePost';
import VoteCommentEntity from '../../entities/VoteComment';
import CommentEntity from '../../entities/Comment';

import User from '../../entities/User';

type Input = {
  UID: string;
};

type Obj = {
  userId: string;
  value: number;
  user: User;
  comment?: Input;
  post?: Input;
  postId?: string;
  commentId?: string;
};

export const vote = async (
  user: User,
  value: number,
  input: Input,
  isPost: boolean
): Promise<PostEntity | CommentEntity> => {
  try {
    const correctValue = value > 0 ? 1 : -1;
    const voteEntity = isPost ? VoteEntity : VoteCommentEntity;
    const inputEntity = isPost ? PostEntity : CommentEntity;
    const key = isPost ? 'postId' : 'commentId';

    let userVote = await voteEntity.findOneBy({ userId: user.UID, [key]: input.UID });
    let entity = await inputEntity.findOneBy({ UID: input.UID });

    let myVote = correctValue;

    if (userVote) {
      if (userVote.value !== correctValue) {
        userVote.value = correctValue;
        await userVote.save();

        entity.votesCount += correctValue * 2;
      } else {
        await userVote.remove();

        myVote = null;
        entity.votesCount -= correctValue;
      }
    } else {
      const obj: Obj = {
        [key]: input.UID,
        userId: user.UID,
        value: correctValue,
        user,
      };

      if (isPost) obj.post = input;
      else obj.comment = input;

      const newVote = voteEntity.create(obj);
      await newVote.save();

      entity.votesCount += correctValue;
    }
    await entity.save();

    entity.myVote = myVote;

    return entity;
  } catch (error) {
    console.log('error', error);
  }
};


export const extendsEntityByMyVote = async (items: PostEntity[] | CommentEntity[], userId: string, isPost = true) => {
  const votes = await getVotesMap(items, userId, isPost);

  return items.map(item => {
    if (votes[item.UID]) {
      item.myVote = votes[item.UID];
    }
    return item;
  });
};

export const getVotesMap = async (items: PostEntity[] | CommentEntity[], userId: string, isPost: boolean) => {
  const UIDs = items.map(({ UID }) => UID);

  const key = isPost ? 'postId' : 'commentId';
  const entity = isPost ? VoteEntity : VoteCommentEntity;

  const votes = await entity.find({ where: { [key]: In(UIDs), userId } });

  return votes.reduce<{ [key: string]: number }>((acc, curr) => {
    const id = curr[key];
    acc[id] = curr['value'];

    return acc;
  }, {});
}

import { In } from 'typeorm';
import PostEntity from '../entities/Post';
import VoteEntity from '../entities/Vote';

export const extendsPostsByMyVote = async (items: PostEntity[], userId: string) => {
  const votes = await getVotesMap(items, userId);

  // items = items.map(item => objVotes[item.UID] ? {...item, myVote: objVotes[item.UID]} : item)
  return items.map(item => {
    if (votes[item.UID]) {
      item.myVote = votes[item.UID];
    }
    return item;
  });
};

export const getVotesMap = async (items: PostEntity[], userId: string) => {
  const postUIDs = items.map(({ UID }) => UID);

  const votes = await VoteEntity.find({
    where: { postId: In(postUIDs), userId },
  });

  return votes.reduce<{ [key: string]: number }>((acc, { postId, value }) => {
    acc[postId] = value;

    return acc;
  }, {});
}

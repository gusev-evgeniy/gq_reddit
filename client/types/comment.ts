import { GetCommentsQuery } from '../generated/graphql';

export type CommentType = Omit<GetCommentsQuery['getComments']['items'][0], 'children'> & {
  children?: CommentType[];
};

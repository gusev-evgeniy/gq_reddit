import { GetCommentsQuery } from "../generated/graphql";

export type CommentsType = GetCommentsQuery['getComments']['items'];

import { Field, InputType, ObjectType } from "type-graphql";
import { Stream } from "stream";
import CommentEntity from '../entities/Comment';
import PostEntity from '../entities/Post';
import UserEntity from '../entities/User';
@InputType()
class Data {
  @Field()
  text: string;
}

@InputType()
export abstract class Block {
  @Field()
  id?: string;

  @Field(() => Data)
  data: Data;

  @Field()
  type: string;
}

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@ObjectType()
export class CommentsResponse {
  @Field(type => [CommentEntity])
  items: CommentEntity[];

  @Field(type => Number)
  totalCount: number;
}
@ObjectType()
export class CommentCreateResponse {
  @Field(type => [CommentEntity])
  items: CommentEntity[];

  @Field(type => Number)
  totalCount: number;
}

@InputType()
export class PostInput extends PostEntity {
  @Field()
  UID: string;
}

@InputType()
export class CommentInput extends CommentEntity {
  @Field()
  UID: string;
}

@InputType()
export class UserInput extends UserEntity {
  @Field()
  UID: string;
}
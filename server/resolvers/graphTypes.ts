import { Field, InputType } from "type-graphql";
import { Stream } from "stream";

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
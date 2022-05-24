import { Field, InputType } from "type-graphql";

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
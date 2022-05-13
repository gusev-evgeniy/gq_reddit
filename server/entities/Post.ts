import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { GraphQLJSON } from 'graphql-type-json';

import { Base } from '.';
import { Field, ObjectType } from 'type-graphql';
import User from './User';

export type Block = {
  data: {
    text: string;
  };
  id: string;
  type: string;
}

@ObjectType()
@Entity('post')
class Post extends Base {

  @Column({ length: 300 })
  @Field({ nullable: false })
  @Index()
  title: string;

  @Column({ type: 'jsonb' })
  @Field(() => GraphQLJSON)
  @Index()
  block: object;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}

export default Post;
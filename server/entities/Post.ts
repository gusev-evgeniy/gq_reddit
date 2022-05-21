import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
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

  @Field({ nullable: false })
  @Column({ length: 300 })
  @Index()
  title: string;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb' })
  @Index()
  block: object;

  @Field()
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.posts)
  author: User;
}

export default Post;
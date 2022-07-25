import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { GraphQLJSON } from 'graphql-type-json';

import Base from '.';
import { Field, ObjectType } from 'type-graphql';
import User from './User';
import Post from './Post';

@ObjectType()
@Entity('comment')
class Comment extends Base {
  @Field(() => GraphQLJSON, { nullable: false })
  @Column({ type: 'text' })
  @Index()
  text: string;

  @Field(() => User, { nullable: false })
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.comments)
  author: User;

  @Field(() => Post, { nullable: false })
  @JoinColumn()
  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}

export default Comment;
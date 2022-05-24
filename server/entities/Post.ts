import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { GraphQLJSON } from 'graphql-type-json';

import { Base } from '.';
import { Field, ObjectType, Resolver } from 'type-graphql';
import User from './User';
import Comment from './Comment';

@ObjectType()
@Resolver(() => Post)
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

  @Field(() => User)
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.posts)
  author: User;

  @Field(() => [Comment])
  @JoinColumn()
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}

export default Post;
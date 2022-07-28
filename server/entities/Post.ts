import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { GraphQLJSON } from 'graphql-type-json';

import Base from '.';
import { Field, ObjectType, Resolver } from 'type-graphql';
import User from './User';
import Comment from './Comment';
import Vote from './VotePost';

@ObjectType()
@Resolver(() => Post)
@Entity('post')
class Post extends Base {

  @Field({ nullable: false })
  @Column({ length: 300 })
  @Index()
  title: string;

  @Field()
  @Column({ default: 0 })
  @Index()
  commentsCount: number;

  @Field()
  @Column({ default: 0 })
  @Index()
  votesCount: number;

  @Field(() => GraphQLJSON)
  @Column({ type: 'jsonb' })
  @Index()
  block: object;

  @Field(() => User)
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.posts)
  author: User;

  @JoinColumn()
  @OneToMany(() => Vote, vote => vote.post)
  votes: Vote[];

  @Field(() => [Comment])
  @JoinColumn()
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Field({ nullable: true })
  myVote: number;
}

export default Post;
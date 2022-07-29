import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany, Tree, TreeParent, TreeChildren } from 'typeorm';

import Base from '.';
import { Field, ObjectType } from 'type-graphql';
import User from './User';
import Post from './Post';
import VoteComment from './VoteComment';
@ObjectType()
@Tree('materialized-path')
@Entity('comment')
class Comment extends Base {
  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  @Index()
  text: string;

  @Field()
  @Column({ default: 0 })
  @Index()
  votesCount: number;

  @Field()
  @Column({ default: true })
  @Index()
  isEmpty: boolean;

  @Field({ nullable: true })
  myVote: number;

  @Field(() => User, { nullable: false })
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.comments)
  author: User;

  @Field(() => Post, { nullable: false })
  @JoinColumn()
  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @Field(() => Comment, { nullable: false })
  @TreeParent()
  parent: Comment;

  @Field(() => [Comment], { nullable: false })
  @TreeChildren()
  children: Comment[];

  @JoinColumn()
  @OneToMany(() => VoteComment, vote => vote.comment)
  votes: VoteComment[];
}

export default Comment;
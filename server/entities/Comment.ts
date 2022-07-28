import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { GraphQLJSON } from 'graphql-type-json';

import Base from '.';
import { Field, ObjectType } from 'type-graphql';
import User from './User';
import Post from './Post';
import VoteComment from './VoteComment';

@ObjectType()
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

  @ManyToOne(type => Comment, comment => comment.children)
  @JoinColumn({ name: "parentId" })
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  children: Comment[];

  @JoinColumn()
  @OneToMany(() => VoteComment, vote => vote.comment)
  votes: VoteComment[];
}

export default Comment;
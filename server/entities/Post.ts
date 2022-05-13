import { Entity, Column, Index, ManyToOne } from 'typeorm';

import { Base } from '.';
import { Field, ObjectType } from 'type-graphql';
import User from './User';

export interface PostInterface {
  author: User;
  title: string;
  text?: string;
}

@ObjectType()
@Entity('post')
class Post extends Base {
  @Column({ length: 300 })
  @Field({ nullable: false })
  @Index()
  title: string;

  @Column({ length: 4000 })
  @Field()
  @Index()
  text: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;
}

export default Post;
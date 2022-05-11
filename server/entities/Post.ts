import { Entity, Column, BeforeInsert, Index } from 'typeorm';
import bcrypt from 'bcrypt';

import { Base } from '.';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('post')
class Post extends Base {
  @Column({ length: 300 })
  @Field({ nullable: false })
  @Index({ unique: true })
  title: string;

  @Column({ length: 4000 })
  @Field({ nullable: false })
  @Index({ unique: true })
  text: string;
  
}

export default Post;
import { Entity, Column, BeforeInsert, Index, OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcrypt';

import Base from '.';
import { Field, ObjectType, Resolver } from 'type-graphql';
import Post from './Post';
import Comment from './Comment';
import Vote from './Vote';

@ObjectType()
@Resolver(() => User)
@Entity('user')
class User extends Base {
  @Column()
  @Field({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column()
  @Field({ nullable: false })
  @Index({ unique: true })
  login: string;
  
  @Column()
  password: string;

  @Field(() => [Post])
  @JoinColumn({ name: 'postUID' })
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @Field(() => [Comment])
  @JoinColumn()
  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @JoinColumn()
  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
   }
}

export default User;
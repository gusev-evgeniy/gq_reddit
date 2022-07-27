import { Entity, Column, BeforeInsert, Index, OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcrypt';

import Base from '.';
import { Field, ObjectType, Resolver } from 'type-graphql';
import Post from './Post';
import Comment from './Comment';
import Vote from './Vote';
import Room from './Room';
import Message from './Message';

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo?: string;

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

  @JoinColumn({ name: 'roomUID' })
  @OneToMany(() => Room, room => room.user)
  rooms: Room[];

  
  @JoinColumn({ name: 'messageUID' })
  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
   }
}

export default User;
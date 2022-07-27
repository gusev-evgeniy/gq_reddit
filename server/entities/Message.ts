import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import Base from '.';
import { Field } from 'type-graphql';
import User from './User';

@Entity('message')
class Message extends Base {
  @Column({ nullable: false, type: 'text' })
  @Index() 
  text: string;

  @Field(() => User)
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.messages)
  user: User;
}

export default Message;
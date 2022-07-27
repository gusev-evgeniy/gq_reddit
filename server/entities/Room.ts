import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import Base from '.';
import { Field } from 'type-graphql';
import User from './User';

@Entity('room')
class Room extends Base {

  @Column({ nullable: true })
  @Index() 
  title: string;

  @Field(() => User)
  @JoinColumn({ name: 'userUID' })
  @ManyToOne(() => User, user => user.rooms)
  user: User;
}

export default Room;
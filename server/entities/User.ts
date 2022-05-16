import { Entity, Column, BeforeInsert, Index, OneToMany, JoinColumn } from 'typeorm';
import bcrypt from 'bcrypt';

import { Base } from '.';
import { Field, ObjectType } from 'type-graphql';
import Post from './Post';

@ObjectType()
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

  @JoinColumn({ name: 'postUID' })
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
   }
}

export default User;
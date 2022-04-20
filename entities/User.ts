import { Entity, Column, BeforeInsert, Index, OneToMany, ManyToMany } from 'typeorm';
import bcrypt from 'bcrypt';

import { Base } from '.';
import { Field, ObjectType } from 'type-graphql';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
   }
}

export default User;
import { Entity, Column, Index, ManyToOne, PrimaryColumn, BaseEntity } from 'typeorm';

import User from './User';
import Post from './Post';

@Entity('vote')
class Vote extends BaseEntity {
  @PrimaryColumn({ type: 'uuid'})
  userId: string

  @PrimaryColumn({ type: 'uuid'})
  postId: string

  @Column()
  @Index()
  value: number; // -1 || 1

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Post, post => post.votes, { cascade: true } )
  post: Post;
}

export default Vote;
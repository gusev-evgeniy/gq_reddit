import { Entity, Column, Index, ManyToOne, PrimaryColumn, BaseEntity } from 'typeorm';

import User from './User';
import Post from './Post';

@Entity('vote_post')
class VotePost extends BaseEntity {
  @PrimaryColumn({ type: 'uuid'})
  userId: string

  @PrimaryColumn({ type: 'uuid'})
  postId: string

  @Column()
  @Index()
  value: number; // -1 || 1

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Post, post => post.votes, { cascade: true, nullable: true } )
  post: Post;
}

export default VotePost;
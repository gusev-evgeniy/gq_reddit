import { Entity, Column, Index, ManyToOne, PrimaryColumn, BaseEntity } from 'typeorm';

import User from './User';
import Post from './Post';
import Comment from './Comment';

@Entity('vote_comment')
class VoteComment extends BaseEntity {
  @PrimaryColumn({ type: 'uuid'})
  userId: string

  @PrimaryColumn({ type: 'uuid'})
  commentId: string

  @Column()
  @Index()
  value: number; // -1 || 1

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Comment, comment => comment.votes, { cascade: true, nullable: true } )
  comment: Post;
}

export default VoteComment;
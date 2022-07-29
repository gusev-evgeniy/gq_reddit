import { Entity, Tree, TreeParent, TreeChildren } from 'typeorm';
import Base from '.';
import Comment from './Comment';

@Tree('materialized-path')
@Entity({ name: 'comment_answer' })
export class CommentAnswer extends Base {
  // Check bellow
  @TreeParent()
  parent: Comment;

  @TreeChildren()
  children: Comment[];
}

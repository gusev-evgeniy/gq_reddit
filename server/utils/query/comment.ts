import CommentEntity from '../../entities/Comment';
import { getDataFromJWT } from '../auth';
import { extendsEntityByMyVote } from './vote';
import { Request } from "express";
import { getManager } from 'typeorm';

type GetComments = {
  where: object;
  req: Request;
}

export const getComments = async ({ where, req }: GetComments) => {
  const { UID } = getDataFromJWT(req.cookies.token) || {};
  console.log('where', where)
  // let items = await getManager().getTreeRepository(CommentEntity).findTrees({ relations: ['author'] });
  let items = await CommentEntity.find({
    where,
    order: { createdAt: 'DESC', children: { createdAt: 'DESC' } },
    relations: ['author', 'children', 'children.author'],
  });

  if (UID) {
    items = await extendsEntityByMyVote(items, UID, false);
  }

  return items;
}

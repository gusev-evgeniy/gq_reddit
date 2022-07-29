import CommentEntity from '../../entities/Comment';
import { getDataFromJWT } from '../auth';
import { extendsEntityByMyVote } from '../vote';
import { Request } from "express";
import { getManager } from 'typeorm';

type GetComments = {
  where: object;
  req: Request;
}

export const getComments = async ({ where, req }: GetComments) => {
  const { UID } = getDataFromJWT(req.cookies.token) || {};

  // let items = await getManager().getTreeRepository(CommentEntity).findTrees({ relations: ['author'] });
  let [items, totalCount] = await CommentEntity.findAndCount({
    where,
    order: { createdAt: 'DESC' },
    relations: ['author'],
  });

  if (UID) {
    items = await extendsEntityByMyVote(items, UID, false);
  }

  return { items, totalCount };
}

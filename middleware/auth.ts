import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserEntity from '../entities/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) throw { message: 'Unauthenticated' };

    const { login }: any = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserEntity.findOneBy({ login });
    if (!user) throw { message: 'Unauthenticated' };

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
};

import { Request } from 'express';
import jwt from 'jsonwebtoken';

import UserEntity from '../entities/User';


export const createJWT = (user: UserEntity) => {
  const { email, login, UID } = user;

  return jwt.sign({ email, login, UID }, process.env.JWT_SECRET!);
}

export const getDataFromJWT = (req: Request): UserEntity | void => {
  const token = req.cookies.token;
    
  if (!token) {
    return;
  }

  return jwt.verify(token, process.env.JWT_SECRET!) as UserEntity;
}
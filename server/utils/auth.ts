import jwt from 'jsonwebtoken';

import UserEntity from '../entities/User';

export const createJWT = (user: UserEntity) => {
  const { email, login, UID } = user;

  return jwt.sign({ email, login, UID }, process.env.JWT_SECRET!);
}

export const getDataFromJWT = (token: string = ''): UserEntity | undefined => {
  console.log('token', token)
  return jwt.verify(token, process.env.JWT_SECRET!) as UserEntity;
}
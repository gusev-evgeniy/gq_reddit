import jwt from 'jsonwebtoken';

import UserEntity from '../entities/User';


export const createJWT = (user: UserEntity) => {
  const { email, login } = user;

  return jwt.sign({ email, login }, process.env.JWT_SECRET!);
}
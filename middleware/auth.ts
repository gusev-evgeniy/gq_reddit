import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import UserEntity from '../entities/User';
import { MyContext } from '../type';

const Auth: MiddlewareFn = async ({ context }, next) => {
  const { req, res } = context as MyContext;

  try {
    const token = req.cookies.token;
    if (!token) throw { message: 'Unauthenticated' };

    const { login }: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await UserEntity.findOneBy({ login });
    if (!user) throw { message: 'Unauthenticated' };

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
};

export default Auth;

import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import UserEntity from '../entities/User';
import { MyContext } from '../type';

const Auth: MiddlewareFn = async ({ context }, next) => {
  const { req, res } = context as MyContext;
  try {
    const token = req.cookies.token;
    console.log('token', token);
    if (!token) throw { message: 'Unauthenticated' };

    const { login }: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('login', login);
    const user = await UserEntity.findOneBy({ login });
    console.log('user', user);

    if (!user) throw { message: 'Unauthenticated' };

    res.locals.user = user;
    await next();
  } catch (error) {
    console.log('Auth error', error)
    // return res.json({ message: 'Unauthenticated' });
  }
};

export default Auth;

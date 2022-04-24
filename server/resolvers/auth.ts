import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import User from "../entities/User";

import bcrypt from 'bcrypt';
import { createJWT } from "../utils/auth";
import { MyContext } from "../type";
import cookie from 'cookie'

import AuthMiddleware from '../middleware/auth';

@Resolver()
export default class Auth {

  @Query(() => String)
  async login(
    @Arg('login', { nullable: false }) login: string,
    @Arg('password', { nullable: false }) password: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const user = await User.findOneBy({ login });
      if (!user) throw { login: "Wrong login" };
      console.log('context', ctx.res)
      const isCorrectPassword = bcrypt.compareSync(password, user.password);
      if (!isCorrectPassword) throw { password: "Wrong password" };

      const token = createJWT(user);
      ctx.res.set('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }))

      return "Success";
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  @Query(() => String)
  @UseMiddleware(AuthMiddleware)
  async getUser(
    @Ctx() { res }: MyContext
  ) {
    return res.locals.user;
  }

  @Mutation(() => String)
  async registr(
    @Arg('email', { nullable: false }) email: string,
    @Arg('login', { nullable: false }) login: string,
    @Arg('password', { nullable: false }) password: string
  ) {
    try {
      const user = User.create({ email, login, password });
      await user.save();

      return "Success";
    } catch (error: any) {
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
          return "User with this email already exist"
        }

        if (error.detail.includes('login')) {
          return "User with this login already exist"
        }
      }
      return error;
    }
  }
}
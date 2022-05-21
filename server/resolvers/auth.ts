import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from 'bcrypt';
import cookie from 'cookie'

import User from "../entities/User";
import { createJWT } from "../utils/auth";
import { MyContext } from "../type";

import AuthMiddleware from '../middleware/auth';


@ObjectType()
class Errors {
  @Field()
  login?: string;

  @Field()
  password?: string;
}


@Resolver()
export default class Auth {

  @Query(() => User, { nullable: true })
  async login(
    @Arg('login', { nullable: false }) login: string,
    @Arg('password', { nullable: false }) password: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const user = await User.findOneByOrFail({ login });
      console.log('user', user)
      const isCorrectPassword = bcrypt.compareSync(password, user.password);
      console.log('isCorrectPassword', isCorrectPassword)
      if (!isCorrectPassword) throw { password: "Wrong password" };
      const token = createJWT(user);
      ctx.res.set('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }))
      console.log('user', user)
      return user;
    } catch (error) {
      return error;
    }
  }

  @Query(() => User)
  @UseMiddleware(AuthMiddleware)
  async me(
    @Ctx() { res }: MyContext
  ) {
    return res.locals.user;
  }

  @Mutation(() => User)
  async registr(
    @Arg('email', { nullable: false }) email: string,
    @Arg('login', { nullable: false }) login: string,
    @Arg('password', { nullable: false }) password: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const user = User.create({ email, login, password });
      await user.save();

      const token = createJWT(user);
      ctx.res.set('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }))

      return user;
    } catch (error: any) {
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
          throw new Error( "User with this email already exist")
        }

        if (error.detail.includes('login')) {
          throw new Error( "User with this login already exist")
        }
      }
      return error;
    }
  }
}
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, Int } from "type-graphql";
import { DataSource } from "typeorm";
import User from "../entities/User";

@ObjectType()
class ResponseWithCount {
  @Field(type => [User])
  User: User[]

  @Field(type => Int)
  totalCount: number
}

@Resolver()
export default class Auth {
  @Query(() => [User]) 
  async getAll(): Promise<User[]> {
    try {
      const users = await User.find();

      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => User)
  async login(
    @Arg('login', { nullable: false }) login: string,
    @Arg('password', { nullable: false }) password: string
  ) {

  }

  @Mutation(() => String)
  async registr(
    @Arg('email', { nullable: false }) email: string,
    @Arg('login', { nullable: false }) login: string,
    @Arg('password', { nullable: false }) password: string
  ) {
    try {
      console.log('email, login, password', email, login, password)
      const user = User.create({ email, login, password });
      await user.save();

      return "Success";
    } catch (error) {

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
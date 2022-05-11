import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Post from './entities/Post';
import User from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'reddit',
  synchronize: true,
  logging: false,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
});

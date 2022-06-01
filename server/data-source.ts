import 'reflect-metadata';
import { DataSource } from 'typeorm';

import Comment from './entities/Comment';
import Post from './entities/Post';
import User from './entities/User';
import Vote from './entities/Vote';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'reddit',
  synchronize: true,
  logging: false,
  entities: [User, Post, Comment, Vote],
  migrations: [],
  subscribers: [],
});

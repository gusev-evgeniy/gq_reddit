// import { AppDataSource } from './data-source';
import { createConnection } from 'typeorm';
require('dotenv/config');

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';

import PostEntity from './entities/Post';
import UserEntity from './entities/User';
import CommentEntity from './entities/Comment';

import Auth from './resolvers/auth';
import Post from './resolvers/post';
import Comment from './resolvers/comment';

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = 5000;

const start = async () => {
  try {
    // await AppDataSource.initialize();
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'reddit',
        synchronize: true,
        logging: false,
        entities: [UserEntity, PostEntity, CommentEntity],
        migrations: [],
        subscribers: [],
    });

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [Auth, Post, Comment],
        validate: false
      }),
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ 
      app, 
      cors: { credentials: true, origin: 'http://localhost:3000' }
      // cors: { credentials: true, origin: 'https://studio.apollographql.com' }
   });

    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

// import AppDataSource from './data-source';
import 'reflect-metadata';
import 'dotenv/config';

import { createConnection } from 'typeorm';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import PostEntity from './entities/Post';
import UserEntity from './entities/User';
import CommentEntity from './entities/Comment';
import VoteEntity from './entities/Vote';

import Auth from './resolvers/auth';
import Post from './resolvers/post';
import Comment from './resolvers/comment';
import Vote from './entities/Vote';

//TODO
// 1. Add transaction in createComment;
// 2. Connect database through AppDataSource.initialize();

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
      entities: [UserEntity, PostEntity, CommentEntity, VoteEntity],
      migrations: [],
      subscribers: [],
    });

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [Auth, Post, Comment, Vote],
        validate: false,
      }),
      csrfPrevention: true,
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });
    await apolloServer.start();

    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    const PORT = 5000;

    app.use(graphqlUploadExpress());

    apolloServer.applyMiddleware({
      app,
      cors: { credentials: true, origin: 'http://localhost:3000' },
      // cors: { credentials: true, origin: 'https://studio.apollographql.com' }
    });

    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

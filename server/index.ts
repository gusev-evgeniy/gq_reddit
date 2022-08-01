// import AppDataSource from './data-source';
import 'reflect-metadata';
import 'dotenv/config';

import { createConnection, DatabaseType } from 'typeorm';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

import PostEntity from './entities/Post';
import UserEntity from './entities/User';
import CommentEntity from './entities/Comment';
import VotePostEntity from './entities/VotePost';
import VoteCommentEntity from './entities/VoteComment';
import RoomEntity from './entities/Room';
import MessageEntity from './entities/Message';

import Auth from './resolvers/auth';
import Post from './resolvers/post';
import Comment from './resolvers/comment';

const PORT = process.env.PORT || 5050;

const start = async () => {
  try {
    // await AppDataSource.initialize();
    await createConnection({
      type: process.env.DB_TYPE as 'postgres' || 'postgres',
      host: process.env.DB_HOST || '',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || '',
      synchronize: true,
      logging: false,
      entities: [
        UserEntity,
        PostEntity,
        CommentEntity,
        VotePostEntity,
        RoomEntity,
        MessageEntity,
        VoteCommentEntity,
      ],
      migrations: [],
      subscribers: [],
    });

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [Auth, Post, Comment],
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
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    app.use(express.json());
    app.use(cookieParser());

    apolloServer.applyMiddleware({
      app,
      cors: { credentials: true, origin: 'http://localhost:3000' },
      // cors: { credentials: true, origin: 'https://studio.apollographql.com' }
    });

    io.on('connection', socket => {
      // if (socket.handshake.headers.cookie) {
      //   const { UID } = getDataFromJWT(socket.handshake.headers.cookie.replace('token=', '')) || {};
      //   console.log('socket.handshake.headers.cookie', socket.handshake.headers.cookie.replace('token=', ''))
      //   console.log('UID', UID);
      // }
      // регистрируем обработчики
      socket.on('message:get', () => console.log('get'));
      socket.on('message:creat', () => console.log('post'));

      socket.on('room:create', () => {
        console.log('eeeee', socket);
      });
    });

    server.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

// import AppDataSource from './data-source';
import 'reflect-metadata';
import 'dotenv/config';

import { createConnection } from 'typeorm';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import sharp from 'sharp';
import cors from 'cors';
import PostEntity from './entities/Post';
import UserEntity from './entities/User';
import CommentEntity from './entities/Comment';
import VoteEntity from './entities/Vote';

import Auth from './resolvers/auth';
import Post from './resolvers/post';
import Comment from './resolvers/comment';
import Vote from './entities/Vote';
import { uploader } from './utils/uploader';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';

import AuthMiddleware from './middleware/auth';
import { getDataFromJWT } from './utils/auth';

//TODO
// 1. Add transaction in createComment;
// 2. Connect database through AppDataSource.initialize();
// 3. use apollo for load images
// 4. write quryBuilder(or raw query) for getPosts

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

    // app.use(cors({
    //   credentials: true,
    //   origin: 'http://localhost:3000'
    // }))

    app.use(express.json());
    app.use(cookieParser());

    const upload = multer({
      storage: multer.diskStorage({
        destination: 'public/images',
        filename: (_, file, callback) => {
          callback(null, nanoid(6) + path.extname(file.originalname)); // e.g. jh34gh2v4y + .png
        },
      }),
      fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
          callback(null, true);
        } else {
          callback(new Error('Not an image'));
        }
      },
    });

    app.post('/upload', upload.single('file'), async (req, res) => {
      const { UID } = getDataFromJWT(req) as UserEntity;
      console.log('UID', UID);
      try {
        const type = req.body.type;
        console.log(req.file);

        if (type !== 'photo' && type !== 'banner') {
          fs.unlinkSync(req.file.path);
          return res.status(400).json({ error: 'Invalid type' });
        }

        const user = await UserEntity.findOneBy({ UID });
        console.log('user', user);
        let oldImageUrn: string = '';

        if (type === 'photo') {
          oldImageUrn = user.photo ?? '';
          user.photo = req.file.filename;
        }

        await user.save();

        if (oldImageUrn !== '') {
          fs.unlinkSync(`public\\upload\\${oldImageUrn}`);
        }

        return res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
      }
    });

    const PORT = 5000;

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

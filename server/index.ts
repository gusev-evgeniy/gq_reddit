// import { AppDataSource } from './data-source';
require('dotenv/config');

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';

import Auth from './resolvers/auth';
import { createConnection } from 'typeorm';

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = 5000;

const start = async () => {
  try {
    // await AppDataSource.initialize();
    await createConnection();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [Auth],
      }),
      context: ({ req, res }) => ({
        req,
        res,
      }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: { credentials: true, origin: 'https://studio.apollographql.com' } });

    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

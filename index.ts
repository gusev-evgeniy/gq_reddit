// import { AppDataSource } from './data-source';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import Auth from './resolvers/auth';
import { createConnection } from 'typeorm';

const app = express();
const PORT = 5000;

const start = async () => {
  try {
    // await AppDataSource.initialize();
    await createConnection();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [Auth],
      }),
      context: (req: Request, res: Response) => ({ req, res })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

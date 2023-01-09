require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import { connectDatabase } from './database';
import { resolvers, typeDefs } from './graphql';

const { PORT, COOKIE_SECRET } = process.env;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(COOKIE_SECRET));

  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ db, req, res }) });

  server.applyMiddleware({ app, path: '/api' });

  app.listen(process.env.PORT, () => {
    console.log(`[app] running on http://localhost:${PORT}`);
  });

  // test db connection
  const listings = await db.listings.find({}).toArray();
};

mount(express());

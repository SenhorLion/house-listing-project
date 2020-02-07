import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";

const app = express();
const PORT = 9000; // TODO: set by .env config
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });

app.listen(PORT, () => {
  console.log(`[app] running on http://localhost:${PORT}`);
});

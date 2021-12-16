import { ApolloServer } from "apollo-server";
import express from "express";
import cors from "cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from "dotenv";
import db from "./src/config/db";
import typeDefs from "./src/graphql/schema";
import resolvers from "./src/graphql/resolvers";
const app = express();
dotenv.config();
app.use(cors());

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => req.headers,
  debug: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

db(server);

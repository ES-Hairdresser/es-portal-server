import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from "dotenv";
import db from "./src/config/db";
import typeDefs from "./src/graphql/schema";
import resolvers from "./src/graphql/resolvers";

dotenv.config();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => req.headers,
  debug: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

db(server);

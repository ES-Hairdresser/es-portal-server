import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from "dotenv";
import db from "./config/db";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

dotenv.config();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  debug: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

db(server);

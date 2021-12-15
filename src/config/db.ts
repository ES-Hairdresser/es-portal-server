import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

export default async (server: ApolloServer) => {
  const port = process.env.SERVER_PORT || 5000;
  try {
    if (process.env.NODE_ENV) {
      await mongoose
        .connect(process.env[process.env.NODE_ENV] as string)
        .then((res) => console.log(`Connected to ${res.connection.name}`))
        .then(() =>
          server
            .listen(port)
            .then((res) => console.log(`Server ready at: ${res.url}`))
        );
    }
  } catch (err) {
    console.log("Connection to db failed:", err);
  }
};

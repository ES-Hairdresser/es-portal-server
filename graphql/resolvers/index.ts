import users from "./user";

export default {
  Query: {
    ...users.Query,
  },
  Mutation: {
    ...users.Mutation,
  },
};

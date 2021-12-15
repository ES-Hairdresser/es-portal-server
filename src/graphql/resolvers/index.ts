import users from "./user";
import services from "./services";

export default {
  Query: {
    ...users.Query,
    ...services.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...services.Mutation,
  },
};

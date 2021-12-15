import users from "./user";
import services from "./services";
import categories from "./categories";

export default {
  Query: {
    ...users.Query,
    ...services.Query,
    ...categories.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...services.Mutation,
    ...categories.Mutation,
  },
};

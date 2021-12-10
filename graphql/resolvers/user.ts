import { ApolloError } from "apollo-server-errors";
enum ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: ROLE;
  notes?: string;
};

const admin: User = {
  id: "12345",
  firstName: "Admin",
  lastName: "Test",
  email: "admin@test.com",
  role: ROLE.ADMIN,
};

const customer: User = {
  id: "67890",
  firstName: "Customer",
  lastName: "Test",
  email: "customer@test.com",
  role: ROLE.CUSTOMER,
  notes: "E' uno stronzo",
};

const users = [admin, customer];

export default {
  Query: {
    async getUserInfo(userId: string) {
      const user = users.filter(({ id }) => id === userId);
      if (!user) {
        throw new ApolloError("User not found");
      }
      return user;
    },
    async getUsersList() {
      return users;
    },
  },
};

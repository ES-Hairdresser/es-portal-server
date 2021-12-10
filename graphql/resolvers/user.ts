import { ApolloError } from "apollo-server-errors";
import { Document } from "mongoose";
import UserModel from "../../models/UserSchema";

/* const admin: User = {
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

const UserModel = [admin, customer]; */

export default {
  Query: {
    async getUserInfo(userId: string): Promise<Document<User>> {
      const user = await UserModel.findOne((user: User) => user.id === userId);
      if (!user) {
        throw new ApolloError("User not found");
      }
      return user;
    },
    async getUsersList(): Promise<Document<User>[]> {
      const users = await UserModel.find();

      if (!users) {
        throw new ApolloError("Users list empty");
      }

      return users;
    },
  },
};

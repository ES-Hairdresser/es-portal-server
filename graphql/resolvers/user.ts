import { ApolloError } from "apollo-server-errors";
import { Document, Model } from "mongoose";
import UserModel from "../../models/UserSchema";
import { User, RegisterInput } from "../../shared/types";
import { isEmailRegistered } from "../helpers/isEmailRegistered";

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
    async getUserInfo(userId: String): Promise<Document<User>> {
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
  Mutation: {
    async registerUser(_: void, args: RegisterInput): Promise<Document<User>> {
      const input = JSON.parse(JSON.stringify(args)).input;
      console.log(input);
      const emailRegistered = await isEmailRegistered(input.email, UserModel);

      if (emailRegistered) {
        throw new ApolloError("L'email inserita é gia registrata nel sistema");
      }
      const user = new UserModel({ ...input }).save();

      return user;
    },
  },
};

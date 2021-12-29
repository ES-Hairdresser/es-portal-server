import { ApolloError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Document, Mongoose, ObjectId } from "mongoose";
import UserModel from "../../models/User";

import {
  User,
  RegisterInput,
  LoginInput,
  LoginResponse,
} from "../../shared/user";
import { isAdmin } from "../helpers/isAdmin";
import { isAuthenticated } from "../helpers/isAuthenticated";
import { isRegistered } from "../helpers/isRegistered";
import { validateRegisterInputFields } from "../helpers/validateRegisterInputFields";

export default {
  Query: {
    async getUserInfo(_: void, _id: any, ctx: any): Promise<Document<User>> {
      const token = ctx.token;

      await isAuthenticated(token);
      await isAdmin(token);

      const user = await UserModel.findById(_id);
      console.log(user);
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
      const { email, password, repeatPassword } = input;

      await validateRegisterInputFields(email, password, repeatPassword);
      const element = await UserModel.findOne({ email });
      if (element) {
        throw new ApolloError(`esiste in database
        `);
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = new UserModel({ ...input, password: hash }).save();

      return user;
    },

    async loginUser(_: void, args: LoginInput): Promise<LoginResponse> {
      const input = JSON.parse(JSON.stringify(args)).input;
      const { email, password: inputPassword } = input;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new ApolloError("Email non registrata");
      }

      const {
        _id,
        firstName,
        lastName,
        profilePicture,
        role,
        email: userEmail,
        password,
      } = user;

      const passwordMatch = bcrypt.compareSync(
        inputPassword,
        password as string
      );

      if (!passwordMatch) {
        throw new ApolloError("Password errata");
      }

      const token = jwt.sign(
        { _id, userEmail, role },
        process.env.JWT_SECRET as string
      );

      if (!token) {
        throw new ApolloError("Failed to generate the token");
      }

      return {
        userData: {
          firstName,
          lastName,
          email: userEmail,
          profilePicture,
        },
        role,
        token,
      };
    },
  },
};

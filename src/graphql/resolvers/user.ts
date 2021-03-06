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
  NoteInput,
  UpdateInput,
} from "../../shared/user";
import { isAdmin } from "../helpers/isAdmin";
import { isAuthenticated } from "../helpers/isAuthenticated";
import { isRegistered } from "../helpers/isRegistered";
import { validateRegisterInputFields } from "../helpers/validateRegisterInputFields";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { sendAccessEmailToUser } from "../helpers/sendAccessEmailToUser";

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
    async registerUser(
      _: void,
      args: RegisterInput,
      ctx: { token: string }
    ): Promise<Document<User>> {
      const admin = await isAdmin(ctx.token);
      const input = JSON.parse(JSON.stringify(args)).input;

      const { email, password, repeatPassword, firstName } = input;

      await validateRegisterInputFields(email, password, repeatPassword);
      if (admin) {
        console.log("admin is registering");

        await sendAccessEmailToUser(email, firstName, password);
      }
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
    async deleteUser(
      _: void,
      args: ObjectId,
      ctx: { token: string }
    ): Promise<boolean> {
      const { token } = ctx;
      const admin = await isAdmin(token);
      const id = JSON.parse(JSON.stringify(args)).id;
      if (!admin) {
        throw new ApolloError("Delete action is only possible for admin");
      }
      await UserModel.findByIdAndDelete(id);
      return true;
    },
    async addNote(
      _: void,
      args: NoteInput,
      ctx: { token: string }
    ): Promise<{ isNoteAdded: boolean }> {
      const { token } = ctx;
      const { userId, body } = JSON.parse(JSON.stringify(args)).input;
      await isAuthenticated(token);
      await isAdmin(token);
      const isAdded = await UserModel.findByIdAndUpdate(userId, {
        $set: {
          notes: body,
        },
      })
        .then((res) => (res?.notes ? true : false))
        .catch((err) => err);
      console.log(isAdded);
      return { isNoteAdded: isAdded };
    },
    async updateUser(
      _: void,
      args: UpdateInput,
      ctx: { token: string }
    ): Promise<Document<User>> {
      const { token } = ctx;
      const data = JSON.parse(JSON.stringify(args)).input;
      console.log(data);

      await isAuthenticated(token);
      await isAdmin(token);

      const user = await UserModel.findById(data._id);
      if (!user) {
        throw new ApolloError("User not found for update");
      }
      Object.assign(user, { ...data });
      user.save();
      return user;
    },
  },
};

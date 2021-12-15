import { model, Schema } from "mongoose";
import { ROLE, User } from "../shared/user";

const User: Schema<User> = new Schema(
  {
    firstName: {
      type: "String",
      trim: true,
      required: true,
    },
    lastName: {
      type: "String",
      trim: true,
      required: true,
    },
    email: {
      type: "String",
      trim: true,
      required: true,
    },
    notes: {
      type: "String",
      trim: true,
    },
    password: {
      type: "String",
      required: true,
      trim: true,
    },
    profilePicture: {
      type: "String",
      trim: true,
    },
    role: {
      type: "String",
      enum: ROLE,
      default: ROLE.CUSTOMER,
    },
  },
  {
    timestamps: true,
  }
);

export default model("user", User, "users");

import { model, Schema } from "mongoose";

const User: Schema<User> = new Schema(
  {
    firstName: {
      type: "string",
      trim: true,
      required: true,
    },
    lastName: {
      type: "string",
      trim: true,
      required: true,
    },
    email: {
      type: "string",
      trim: true,
      required: true,
    },
    notes: {
      type: "string",
      trim: true,
    },
    profilePicture: {
      type: "string",
      trim: true,
    },
    role: {
      type: "string",
      enum: ROLE,
      default: ROLE.CUSTOMER,
    },
  },
  {
    timestamps: true,
  }
);

export default model("user", User, "users");

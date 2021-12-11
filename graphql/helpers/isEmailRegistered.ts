import { Model } from "mongoose";
import { User } from "../../shared/types";

export const isEmailRegistered = async (
  email: string,
  model: Model<User, {}, {}, {}>
): Promise<boolean> => {
  const user = await model.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

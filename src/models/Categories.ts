import { model, Schema } from "mongoose";

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("category", CategoriesSchema, "categories");

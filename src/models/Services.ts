import { model, Schema } from "mongoose";
import Category from "./Categories";

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    target: {
      enum: ["Uomo", "Donna", "Bambino", "Unisex"],
      required: true,
      type: String,
    },
    category: {
      enum: [Category],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.path("price").get((num: number) => (num / 100).toFixed(2));
ServiceSchema.path("price").set((num: number) => num * 100);

export default model("Servizo", ServiceSchema, "Servizi");

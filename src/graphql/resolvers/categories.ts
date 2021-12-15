import { ICategory } from "../../shared/categories";
import Categories from "../../models/Categories";
import { Document } from "mongoose";
import { ApolloError } from "apollo-server-errors";
import { isAdmin } from "../helpers/isAdmin";
import { isRegistered } from "../helpers/isRegistered";

export default {
  Query: {
    async getCategory(_: void, input: string): Promise<Document<ICategory>> {
      console.log(input);
      const cat = await Categories.findOne({ input });

      if (!cat) {
        throw new ApolloError("Categoria non trovata");
      }
      return cat;
    },
    async getCategories(): Promise<Document<ICategory>[]> {
      const categories = await Categories.find();

      if (!categories) {
        throw new ApolloError("non ci sono categorie");
      }

      return categories;
    },
  },
  Mutation: {
    async addCategory(
      _: void,
      { name }: ICategory,
      ctx: any
    ): Promise<Document<ICategory>> {
      await isAdmin(ctx.token);
      await isRegistered(name, Categories);

      const newCategory = new Categories({
        name,
      }).save();

      return await newCategory;
    },
  },
};

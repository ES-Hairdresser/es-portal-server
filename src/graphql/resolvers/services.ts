import { AddService, ServiceType } from "../../shared/services";
import Service from "../../models/Services";
import { Document } from "mongoose";
import { ApolloError } from "apollo-server-errors";
import { isAdmin } from "../helpers/isAdmin";

export default {
  Query: {
    async getServices(): Promise<Document<ServiceType>[]> {
      const services = await Service.find();

      if (services.length === 0) {
        throw new ApolloError("Non ci sono servizi salvati in database");
      }
      return services;
    },
  },
  Mutation: {
    async addService(
      _: void,
      { input }: AddService,
      ctx: any
    ): Promise<Document<ServiceType>> {
      await isAdmin(ctx.token);

      const { name, price, target, description } = input;
      const newService = new Service({
        name,
        price,
        target,
        description,
      }).save();

      return await newService;
    },
  },
};

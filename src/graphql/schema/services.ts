import { gql } from "apollo-server-core";
import categories from "../../models/Categories";

const typeDefs = gql`
  type Service {
    id: ID!
    name: String!
    price: Float!
    category: String!
    description: String
    target: Target!
    createdAt: String!
  }

  type Query {
    getServices: [Service!]!
  }
  enum Target {
    Uomo
    Donna
    Unisex
    Bambino
  }
  input AddServiceInput {
    name: String!
    price: Float!
    description: String
    target: Target!
    category: String!
  }

  type Mutation {
    addService(input: AddServiceInput): Service!
  }
`;

export default typeDefs;

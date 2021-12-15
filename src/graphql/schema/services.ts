import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Service {
    id: ID!
    name: String!
    price: Float!
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
  }

  type Mutation {
    addService(input: AddServiceInput): Service!
  }
`;

export default typeDefs;

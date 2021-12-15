import { gql } from "apollo-server-core";

export default gql`
  type Category {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCategories: [Category!]!
    getCategory(categoryId: String!): Category!
  }

  type Mutation {
    addCategory(name: String!): Category!
    removeCategory(id: ID!): Boolean!
  }
`;

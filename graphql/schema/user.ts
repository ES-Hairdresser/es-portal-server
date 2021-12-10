import { gql } from "apollo-server-core";

export default gql`
  enum Role {
    ADMIN
    CUSTOMER
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    notes: String
    profilePicture: String
  }

  input registerInput {
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    notes: String
    profilePicture: String
  }

  type Query {
    getUserInfo(id: ID!): User!
    getUsersList: [User!]!
  }

  type Mutation {
    registerUser(input: registerInput): User
  }
`;

import { gql } from "apollo-server-core";

export default gql`
  enum Role {
    ADMIN
    CUSTOMER
  }

  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    role: Role
    notes: String
    profilePicture: String
    createdAt: String
    updatedAt: String
  }

  input registerInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    repeatPassword: String!
    role: Role
    notes: String
    profilePicture: String
  }

  input loginInput {
    email: String!
    password: String!
  }

  type LoggedUserData {
    email: String!
    firstName: String!
    lastName: String!
    profilePicture: String!
  }

  type LoginResponse {
    userData: LoggedUserData
    role: String!
    token: String!
  }
  type Query {
    getUserInfo(id: ID!): User!
    getUsersList: [User!]!
  }

  type Mutation {
    registerUser(input: registerInput): User!
    loginUser(input: loginInput): LoginResponse!
  }
`;

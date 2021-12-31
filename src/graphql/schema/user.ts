import { gql } from "apollo-server-core";

export default gql`
  enum Role {
    ADMIN
    CUSTOMER
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    role: Role
    phone: String
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
    phone: String!
    repeatPassword: String!
    role: Role
    notes: String
    profilePicture: String
  }

  input loginInput {
    email: String!
    password: String!
  }

  input noteInput {
    userId: ID!
    body: String!
  }

  type NoteResponse {
    isNoteAdded: Boolean!
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
    getUserInfo(_id: ID!): User!
    getUsersList: [User!]!
  }

  type Mutation {
    registerUser(input: registerInput): User!
    loginUser(input: loginInput): LoginResponse!
    addNote(input: noteInput): NoteResponse!
  }
`;

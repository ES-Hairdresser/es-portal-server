export enum ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface RegisterInput {
  firstName: String;
  lastName: String;
  email: String;
  role?: ROLE;
  password: String;
  notes?: String;
  profilePicture?: String;
}

export type User = {
  id?: String;
  firstName: String;
  lastName: String;
  email: String;
  password?: String;
  role?: ROLE;
  notes?: String;
  profilePicture?: String;
  createdAt?: String;
  updatedAt?: String;
};
export interface LoginInput {
  email: String;
  password: String;
}

type LoggedUserData = {
  email: String;
  firstName: String;
  lastName: String;
  profilePicture?: String;
};

export type LoginResponse = {
  userData?: LoggedUserData;
  role?: String;
  token: String;
};

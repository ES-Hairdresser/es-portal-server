export enum ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  role?: ROLE;
  password: string;
  repeatPassword: string;
  notes?: string;
  profilePicture?: String;
}

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  role?: ROLE;
  notes?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type LoginInput = {
  email: string;
  password: string;
};

type LoggedUserData = {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
};

export type LoginResponse = {
  userData?: LoggedUserData;
  role?: string;
  token: string;
};

export type NoteInput = {
  body: string;
  userId: string;
};
export type Note = {
  body: string;
};

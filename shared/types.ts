enum ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: ROLE;
  notes?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
};

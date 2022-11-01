export interface User {
  _id?: string;
  name: string;
  lastnames: string;
  birthdate: string;
  phone: number;
  email: string;
  role: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
}

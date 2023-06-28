import { User } from "../user";

export interface LoginResponse{
  user: User;
  access_token: AuthToken;
}

export type AuthToken = string;

export interface LoginBody {
  email: string;
  password: string;
}
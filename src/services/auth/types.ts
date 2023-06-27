export interface LoginResponse{
  access_token: AuthToken;
}

export type AuthToken = string;

export interface LoginBody {
  email: string;
  password: string;
}
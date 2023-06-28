import getConfig from 'next/config';
import * as api from '../api';
import { ErrorResponse } from '../types';
import { RegisterUserData, User } from './types';
import { LoginResponse } from '../auth';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const USER_API_URL = `${apiUrl}/users`;

export const getProfile = (shouldFetch: boolean) => {
  return api.get<User, ErrorResponse>(`${USER_API_URL}/me`, { shouldFetch });
}

export const registerUser = (data: RegisterUserData) => {
  return api.post<LoginResponse, RegisterUserData>(USER_API_URL, data);
}

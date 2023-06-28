import getConfig from 'next/config';
import * as api from '../api';
import { ErrorResponse } from '../types';
import { RegisterUserData, User } from './types';
import { LoginResponse } from '../auth';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const USER_API_URL = `${apiUrl}/users`;

export const getProfile = (opts?: api.ApiStateOption) => {
  return api.getState<User, ErrorResponse>(`${USER_API_URL}/me`, opts);
}

export const getMyProfile = () => {
  return api.get<User>(`${USER_API_URL}/me`);
}

export const registerUser = (data: RegisterUserData) => {
  return api.post<LoginResponse, RegisterUserData>(USER_API_URL, data);
}

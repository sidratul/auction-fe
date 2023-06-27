import getConfig from 'next/config';
import * as api from '../api';
import { ErrorResponse } from '../types';
import { LoginBody, LoginResponse } from './types';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const AUTH_API_URL = `${apiUrl}/auth`;

export const login = (data: LoginBody) => {
  return api.post<LoginResponse, LoginBody>(`${AUTH_API_URL}/login`, data);
}

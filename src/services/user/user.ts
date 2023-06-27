import getConfig from 'next/config';
import * as api from '../api';
import { ErrorResponse } from '../types';
import { User } from './types';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const USER_API_URL = `${apiUrl}/users`;

export const getMyProfile = () => {
  return api.get<User, ErrorResponse>(USER_API_URL);
}

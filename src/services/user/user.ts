import getConfig from 'next/config';
import * as api from '../api';
import { ErrorResponse } from '../type';
import { User } from './type';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const USER_API_URL = `${apiUrl}/users`;

export const getMyProfile = () => {
  return api.get<User, ErrorResponse>(USER_API_URL);
}

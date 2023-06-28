import getConfig from 'next/config';
import * as api from '../api';
import { ErrorResponse } from '../types';
import { LoginResponse } from '../auth';
import { Balance, Deposit } from './types';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const BALANCE_API_URL = `${apiUrl}/balances`;

export const getBalance = () => {
  return api.get<Balance, ErrorResponse>(`${BALANCE_API_URL}`);
}

export const reloadBalance = () => {
  return api.mutation(`${BALANCE_API_URL}`);
}

export const deposit = (data: Deposit) => {
  return api.post<Balance, Deposit>(`${BALANCE_API_URL}`, data);
}
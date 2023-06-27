import axios, { AxiosError } from 'axios';
import UseSWR from 'swr';
import { AuthToken } from './auth/type';

export const setDefaultToken = (token: AuthToken) => {
  if (!token) {
    return;
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const fetcher = <T>(url: string): Promise<T> => axios.get<T>(url).then(res => res.data)

export type ApiError<T> = AxiosError<T>;

export const get = <T,E=unknown>(url: string) => {
  return UseSWR<T, E>(url, fetcher, {
    revalidateOnFocus: false,
  });
}


import axios, { AxiosError, AxiosResponse } from 'axios';
import UseSWR from 'swr';
import UseSWRMutation from 'swr/mutation'
import { AuthToken } from './auth/types';

export const setDefaultToken = (token: AuthToken) => {
  if (!token) {
    return;
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const fetcher = <T>(url: string): Promise<T> => axios.get<T>(url).then(res => res.data)

export type ApiError<T> = AxiosError<T>;

export interface ApiStateOption {
  shouldFetch: boolean;
}

export const get = <T,E=unknown>(url: string, opts?: ApiStateOption) => {
  return UseSWR<T, AxiosError<E>>(() => opts?.shouldFetch !== false? url : null, fetcher, {
    revalidateOnFocus: false,
  });
}

export const mutation = (url: string) => {
  return UseSWRMutation(url, fetcher);
}

export const post = <T, D=unknown>(url: string, body: D) => {
  return axios.post<T, AxiosResponse<T>, D>(url, body);
}

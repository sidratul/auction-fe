import { QueryParams } from './ApiTableControl';
import { DataList } from './types';
import * as api from '@/services/api';

export const getData = <T = unknown, P = unknown>(url: string, params: QueryParams<T,P> ) => {
  const newUrl = new URL(url);

  const r = new URLSearchParams(params as Record<string, string>).toString()

  Object.keys(params).forEach((key) => {
    const k = key as keyof QueryParams<T,P>;
    newUrl.searchParams.set(key, String(params[k]));
  });

  return api.get<DataList<T>>(newUrl.href);
}
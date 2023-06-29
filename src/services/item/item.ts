import getConfig from 'next/config';
import * as api from '../api';
import { CreateItem, Item, } from './types';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

export const ITEM_API_URL = `${apiUrl}/items`;

export const createItem = (data: CreateItem) => {
  return api.post<Item, CreateItem>(ITEM_API_URL, data);
}

export const publishItem = (itemId: string) => {
  return api.patch<Item>(`${ITEM_API_URL}/${itemId}/publish`);
}

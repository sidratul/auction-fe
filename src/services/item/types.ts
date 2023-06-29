import { Bid } from "../bid/types";

export interface CreateItem {
  name: string;
  startPrice: number;
  time: number;
}

export enum ItemStatus {
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
}

export interface Item {
  userId: string
  name: string
  startPrice: number
  time: number
  endDate: Date
  id: string
  status: ItemStatus
  createdAt: string
  updateAt: string
  __highestBid__: Bid
}

export interface ItemListParam {
  page: string;
  limit: string;
  status: string[];
}

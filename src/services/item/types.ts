export interface CreateItem {
  name: string;
  startPrice: number;
  time: number;
}

export interface Item {
  userId: string
  name: string
  startPrice: number
  time: number
  endDate: Date
  id: string
  status: string
  createdAt: string
  updateAt: string
}

export interface ItemListParam {
  page: string;
  limit: string;
  status: string[];
}

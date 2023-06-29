export interface BidFormData {
  price: number;
}

export interface BidData extends BidFormData {
  itemId: string;
}

export interface Bid{
  itemId: string
  price: number
  userId: string
  id: string
  createdAt: string
  updateAt: string
}

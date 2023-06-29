import getConfig from 'next/config';
import * as api from '../api';
import { Bid, BidData } from './types';

const { publicRuntimeConfig = {} } = getConfig();
const { apiUrl } = publicRuntimeConfig;

const BID_API_URL = `${apiUrl}/bids`;

export const createBid = (data: BidData) => {
  return api.post<Bid, BidData>(`${BID_API_URL}`, data);
}

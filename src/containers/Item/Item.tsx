import React from 'react'
import { ApiTable, ApiTableControl, ApiTableControlProps } from '@/components/ApiTable'
import { ITEM_API_URL, Item, ItemListParam } from '@/services/item';
import { BidAction } from './Actions/BidAction';
import { PublishAction } from './Actions/PublishAction';

const tableProps: ApiTableControlProps<Item> = {
  columns: [
    {
      label: "Nama",
      value: "name",
      sort: "name",
    },
    {
      label: "Current Price",
      value(item){
        const price = item.__highestBid__?.price || item.startPrice;
        return `$${price}`;
      },
    },
    {
      label: "Duration",
      sort: "endDate",
      value(item){
        return `${item.time}`;
      },
    },
    {
      label: "Action",
      value: (item) => (
        <>
          <BidAction item={item}/>
          <PublishAction item={item}/>
        </>
      ),
    },
  ],
  url: ITEM_API_URL,
  orderBy: "createdAt",
  orderType: "DESC",
};

export const ItemContainer = () => {
  const control = new ApiTableControl<Item, ItemListParam>(tableProps);
  return (
    <>
      <div className="card-body">
        <ApiTable
          control={control}
        />
      </div>
    </>
  )
}
import React from 'react'
import { ApiTable, ApiTableControl, ApiTableControlProps } from '@/components/ApiTable'
import { ITEM_API_URL, Item, ItemListParam } from '@/services/item';

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
        let price = item.startPrice;
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
      value: (data) => (
        <>
          <div>Bid</div>
        </>
      ),
    },
  ],
  url: ITEM_API_URL,
  orderBy: "endDate",
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
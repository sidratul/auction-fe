import React, { useState } from 'react'
import { Item, ItemListParam, ItemStatus } from '@/services/item'
import { Button } from '@/components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { BidForm } from '../Form/BidForm';
import { useApiTableContext } from '@/components/ApiTable';

interface BidActionProps {
  item: Item;
}

export const BidAction = (props: BidActionProps) => {
  const { control } = useApiTableContext<Item, ItemListParam>();
  const { item } = props;
  const [open, setOpen] = useState(false);

  if (item.status === ItemStatus.CREATED || new Date(item.endDate) < new Date()) {
    return <></>;
  }

  const onClick = () => {
    setOpen(true);
  }

  const onFinish = () => {
    setOpen(false);
    control.refresh();
  }

  return (
    <>
      <Button style='secondary' size='medium' onClick={onClick}>Bid</Button>
      <Modal open={open} onClose={()=> setOpen(false)} center >
        <h2 className='mb-3'>Bid {item.name}</h2>
        <div className='w-[500px]'>
          <BidForm item={item} onFinish={onFinish}/>
        </div>
      </Modal>
    </>
  )
}

import React, { useState } from 'react'
import { Item, ItemListParam, ItemStatus, publishItem } from '@/services/item'
import { Button } from '@/components';
import 'react-responsive-modal/styles.css';
import { useApiTableContext } from '@/components/ApiTable';
import { useLayoutContext } from '@/layouts';
import { toast } from 'react-toastify';
import { ApiError } from '@/services/api';
import { ErrorResponse } from '@/services/types';

interface BidActionProps {
  item: Item;
}

export const PublishAction = (props: BidActionProps) => {
  const { control } = useApiTableContext<Item, ItemListParam>();
  const [loading, setLoading] = useState(false);
  const { user } = useLayoutContext()
  const { item } = props;

  if (item.status !== ItemStatus.CREATED || item.userId !== user?.id) {
    return <></>;
  }

  const onClick = async () => {
    setLoading(true);

    try {
      await publishItem(item.id);
      toast.success(`Publish succeed!`);
      control.refresh();
    } catch(err){
      const error = err as ApiError<ErrorResponse>;
      let message = error.response?.data.message;
      if(Array.isArray(message)) {
        message = message[0];
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button disabled={loading} style='primary' size='medium' onClick={onClick}>Publish</Button>
    </>
  )
}

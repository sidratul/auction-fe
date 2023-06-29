import React, { useState } from 'react'
import { Button, NumberField } from '@/components'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { DynamicForm , useForm, InputProps, FormFields } from '@/components/DynamicForm';
import { ApiError } from '@/services/api';
import { ErrorResponse } from '@/services/types';
import { useRouter } from 'next/router';
import { Item, ItemStatus } from '@/services/item';
import { createBid, BidData, BidFormData } from '@/services/bid';
import { getBalance } from '@/services/balance';

const fields : FormFields<BidFormData> = {
  price: {
    component: NumberField,
    props: ({onChange}): InputProps<typeof NumberField> =>{
      return {
        onChange: onChange,
        label: 'Bid Price',
        placeholder: 'Bid Price',
      }
    },
  },
};

interface BidFormProps {
  item: Item;
  onFinish?: () => void;
}

export const BidForm = ({ item, onFinish }: BidFormProps) => {
  const [loading, setLoading] = useState(false);
  const { data: balance, isLoading , error, mutate } = getBalance();
  const { push } = useRouter();
  const higestPrice = item.__highestBid__?.price || item.startPrice;

  const finish = () => {
    onFinish && onFinish()
  }

  const handleSubmit = async (values: BidFormData) => {
    setLoading(true);
    const bidData: BidData = {
      ...values,
      itemId: item.id,
    }

    if (new Date(item.endDate) < new Date()) {
      toast.error('Bid time has ended');
      finish();
      return;
    }


    if( item.status === ItemStatus.CREATED) {
      toast.error(`Item is not yet published`);
      finish();
      return;
    }

    /**TODO: check end time by client*/
    if( balance && balance?.amount < values.price ) {
      toast.error(`Insufficient Balance`);
      finish();
      return;
    }

    try {
      await createBid(bidData);
      toast.success(`Bid succeed!`);
      mutate();
    } catch(err){
      const error = err as ApiError<ErrorResponse>;
      let message = error.response?.data.message;
      if(Array.isArray(message)) {
        message = message[0];
      }
      toast.error(message);
    } finally {
      finish();
      setLoading(false);
    }
  }

  const { control } = useForm<BidFormData>({
    fields,
    validations: Yup.object({
      price: Yup.number()
        .required()
        .transform((value) => Number.isNaN(value) ? null : value )
        .moreThan(higestPrice)
    }),
  });

  return (
    <div className='grid gap-3'>
      <DynamicForm
        control={control}
        onSubmit={handleSubmit}
      />
      <Button
        disabled={loading}
        style='primary'
        onClick={()=>control.submit()}
      >Submit</Button>
    </div>
  )
}

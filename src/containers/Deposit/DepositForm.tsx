
import React, { useState } from 'react'
import { Button, EmailField, NumberField } from '@/components'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { DynamicForm , useForm, InputProps } from '@/components/DynamicForm';
import { ApiError } from '@/services/api';
import { ErrorResponse } from '@/services/types';
import { Deposit, deposit, reloadBalance } from '@/services/balance';

export const DepositForm = () => {
  const [loading, setLoading] = useState(false);
  const { trigger } = reloadBalance();

  const handleSubmit = async (values: Deposit) => {
    setLoading(true);
    try {
      await deposit(values);
      trigger();
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

  const { control } = useForm<Deposit>({
    fields : {
      amount: {
        component: NumberField,
        props: ({onChange, name}): InputProps<typeof NumberField> =>{
          return {
            onChange: onChange,
            label: name,
            placeholder: name,
          }
        },
      },
    },
    validations: Yup.object({
      amount: Yup.number()
        .required()
        .transform((value) => Number.isNaN(value) ? null : value )
        .min(0),
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

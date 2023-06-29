import React, { useState } from 'react'
import { Button, NumberField, TextField } from '@/components'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { DynamicForm , useForm, InputProps, FormFields } from '@/components/DynamicForm';
import { ApiError } from '@/services/api';
import { ErrorResponse } from '@/services/types';
import { CreateItem, createItem } from '@/services/item';
import { TimeField } from '@/components/Input/TimeField';
import { useRouter } from 'next/router';

const fields : FormFields<CreateItem> = {
  name: {
    component: TextField,
    props: ({onChange, name}): InputProps<typeof TextField> =>{
      return {
        onChange: onChange,
        label: name,
        placeholder: name,
      }
    },
  },
  startPrice: {
    component: NumberField,
    props: ({onChange, name}): InputProps<typeof NumberField> =>{
      return {
        onChange: onChange,
        label: 'Start Price',
        placeholder: 'Start Price',
      }
    },
  },
  time: {
    component: TimeField,
    props: ({handleChange, name}): InputProps<typeof TimeField> =>{
      return {
        handleChange,
      }
    },
  },
};

export const CreateItemForm = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (values: CreateItem) => {
    setLoading(true);
    try {
      await createItem(values);
      toast.success(`Item created successfully`);
      push('/');
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

  const { control } = useForm<CreateItem>({
    fields,
    validations: Yup.object({
      name: Yup.string()
        .required(),
      startPrice: Yup.number()
        .required()
        .transform((value) => Number.isNaN(value) ? null : value )
        .min(0),
      time: Yup.number()
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

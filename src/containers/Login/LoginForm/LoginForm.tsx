
import React from 'react'
import { TextField, PaswordField, Button, EmailField } from '@/components'
import * as Yup from 'yup';
import { useLayoutContext } from '@/layouts';
import { toast } from 'react-toastify';
import { DynamicForm, Field, useForm, InputProps } from '@/components/DynamicForm';
import { LoginData, RegisterUserData, registerUser } from '@/services/user';
import { ApiError } from '@/services/api';
import { ErrorResponse } from '@/services/types';
import { login } from '@/services/auth';

export const LoginForm = () => {
  const { userLogin } = useLayoutContext();

  const handleSubmit = async (values: LoginData) => {
    try {
      const register = await login(values);
      userLogin(register.data);
    } catch(err){
      const error =  err as ApiError<ErrorResponse>;
      let message = error.response?.data.message;
      if(Array.isArray(message)) {
        message = message[0];
      }

      toast.error(message);
    }
  }

  const { control } = useForm<LoginData>({
    fields : {
      email: {
        component: EmailField,
        props: (props): InputProps<typeof EmailField> =>{
          return {
            onChange: props.onChange,
            label: 'Email',
            placeholder: 'Email',
          }
        },
      },
      password: {
        component: PaswordField,
        props: ({ onChange }): InputProps<typeof PaswordField> => {
          return {
            onChange,
            label: 'Password',
            placeholder: 'Password',
          }
        }
      },
    },
    validations: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
  });

  return (
    <div className='grid gap-3'>
      <DynamicForm
        control={control}
        onSubmit={handleSubmit}
      />
      <Button
        style='primary'
        onClick={()=>control.submit()}
      >Submit</Button>
    </div>

  )
}


import React from 'react'
import { TextField, PaswordField, Button, EmailField } from '@/components'
import * as Yup from 'yup';
import { useLayoutContext } from '@/layouts';
import { toast } from 'react-toastify';
import { DynamicForm, Field, useForm, InputProps } from '@/components/DynamicForm';
import { RegisterUserData, registerUser } from '@/services/user';
import { ApiError } from '@/services/api';
import { ErrorResponse } from '@/services/types';


export const RegisterForm = () => {
  const { userLogin } = useLayoutContext();

  const handleSubmit = async (values: RegisterUserData) => {
    try {
      const register = await registerUser(values);
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

  const { control } = useForm<RegisterUserData>({
    fields : {
      name: {
        component: TextField,
        props: (props): InputProps<typeof TextField> =>{
          return {
            onChange: props.onChange,
            label: 'Name',
            placeholder: 'Name',
          }
        },
      },
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
      confirmPassword: {
        component: PaswordField,
        props: ({ onChange }): InputProps<typeof PaswordField> => {
          return {
            onChange,
            label: 'Confirm Password',
            placeholder: 'Confirm Password',
          }
        }
      },
    },
    validations: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match'),
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

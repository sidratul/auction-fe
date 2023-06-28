
import React from 'react'
import { BaseTextInput, TextField } from '@/components'
import * as Yup from 'yup';
import { useLayoutContext } from '@/layouts';
import { toast } from 'react-toastify';
import { DynamicForm, Field, useForm, InputProps } from '@/components/DynamicForm';

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { userLogin } = useLayoutContext();

  const handleSubmit = async (values: RegisterData) => {
    console.log("values", values);
  }

  const { control } = useForm<RegisterData>({
    fields : {
      email: {
        component: BaseTextInput,
        props: (props): InputProps<typeof BaseTextInput> =>{
          return {
            onChange: props.onChange,
            label: 'Email',
            placeholder: 'Email',
          }
        },
      },
      password: {
        label: 'Password',
        component: TextField,
        props: ({ onChange }): InputProps<typeof TextField> => {
          return {
            onChange,
            placeholder: 'Password',
          }
        }
      },
      confirmPassword: {
        label: 'Email',
        component: TextField,
        props: (props): InputProps<typeof TextField> => {
          return {
            ...props,
            placeholder: 'Confirm Password',
          }
        }
      },
    },
    validations: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match'),
    }),
  });

  return (
    <>
      <DynamicForm
        control={control}
        onSubmit={handleSubmit}
      />
      <button onClick={()=>control.submit()}>submit</button>
    </>

  )
}

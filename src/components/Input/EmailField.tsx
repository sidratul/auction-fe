import React, { InputHTMLAttributes } from 'react'
import { BaseTextInput, BaseTextInputProps } from './BaseTextInput';
import { TextFieldProps } from './TextField';

type EmailFieldProps = TextFieldProps;

export const EmailField = (props: EmailFieldProps) => {
  return (
    <BaseTextInput
      type='email'
      {...props}
    />
  )
}

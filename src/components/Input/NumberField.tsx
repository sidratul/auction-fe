import React, { InputHTMLAttributes } from 'react'
import { BaseTextInput, BaseTextInputProps } from './BaseTextInput';
import { TextFieldProps } from './TextField';

type EmailFieldProps = TextFieldProps;

export const NumberField = (props: EmailFieldProps) => {
  return (
    <BaseTextInput
      {...props}
      type='number'
    />
  )
}

import React, { InputHTMLAttributes } from 'react'
import { BaseTextInput } from './BaseTextInput';
import { TextFieldProps } from './TextField';

type PaswordFieldProps = TextFieldProps;

export const PaswordField = (props: PaswordFieldProps) => {
  return (
    <BaseTextInput
      type='password'
      {...props}
    />
  )
}

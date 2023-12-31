import React, { InputHTMLAttributes } from 'react'
import { BaseTextInput, BaseTextInputProps } from './BaseTextInput';

export interface TextFieldProps extends Omit<BaseTextInputProps, 'type'>  {}

export const TextField = (props: TextFieldProps) => {
  return (
    <BaseTextInput
      type='text'
      {...props}
    />
  )
}

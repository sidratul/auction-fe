import React, { InputHTMLAttributes } from 'react'
import styles from './BaseTextInput/BaseTextInput.module.scss';

interface TextFieldProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'placeholder' | 'id' | 'onChange'> {}

export const TextField = (props: TextFieldProps) => {
  return (
    <input
      className={`${styles.input}`}
      {...props}
    />
  )
}

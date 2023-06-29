import React, { InputHTMLAttributes, useRef, useState } from 'react'
import styles from './BaseTextInput.module.scss';
// import { Icon } from '@/components/Icon';

export interface BaseTextInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'placeholder' | 'id' | 'onChange'> {
  label?: string;
  error?: string;
  info?: string
  innerRef?: React.RefObject<HTMLInputElement>;
}

export const BaseTextInput = (props: BaseTextInputProps) => {
  const { id, label, error, type, info, innerRef, ...others} = props;
  const isPassword = props.type === 'password';
  const [view, setView]= useState(!isPassword);
  const passStyle = isPassword && !view ? styles.password : '';

  return (
    <div className={`${styles.root} ${error && styles['error']} ${passStyle}`}>
      <label className={styles.label} htmlFor={id}> {label}</label>
      <input
        ref={innerRef}
        id={id}
        type={isPassword? 'text' : type}
        className={`${styles.input}`}
        {...others}
      />
      {
        isPassword && (
          <span
            className={`${styles.icon} cursor-pointer`}
            onClick={()=>setView(!view)}>
            {view ? 'Hide' : 'Show'}
          </span>
        )
      }
      {error && (
        <div className={styles.message}>{error}</div>
      )}
      { info && (
        <div className={styles.info}>{info}</div>
      )}
    </div>
  )
}

export default BaseTextInput;
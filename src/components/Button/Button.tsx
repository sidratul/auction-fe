import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss';

interface ButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>{
  label: string;
  style?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {style, label, loading, disabled, size, children,...other} = props;

  return (
    <button
      className={`
        ${styles.btn}
        ${size && styles[size]}
        ${style && styles[style]}
        ${loading && styles.loading}
        ${disabled && styles.disabled}
      `}
      {...other}
    >{children}</button>
  )
}

Button.defaultProps = {
  loading: false,
  disabled: false,
  size: 'large',
} as Partial<ButtonProps>;

export default Button;

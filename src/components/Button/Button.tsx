import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss';
import { Icon } from '../Icon';

interface ButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>{
  label: string;
  style?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {style, label, loading, disabled, size, ...other} = props;
  let width = 16;
  let height = 20;
  if (size !== 'large') {
    width = 10.67;
    height = 13.33;
  }

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
    >{!loading ? label : (
        <Icon icon='Hourglass' height={height} width={width} className={styles.icon}/>
      )}
    </button>
  )
}

Button.defaultProps = {
  loading: false,
  disabled: false,
  size: 'large',
} as Partial<ButtonProps>;

export default Button;

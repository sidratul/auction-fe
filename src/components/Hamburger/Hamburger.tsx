import React from 'react';
import styles from './Hamburger.module.scss';

interface HamburgerProps{
  onClick: ()=> void;
  active: boolean;
}

export const Hamburger = ({active, onClick}: HamburgerProps) => {
  return (
    <div className={`${styles.root} ${active? styles.open : ''}`} onClick={onClick}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
  )
}

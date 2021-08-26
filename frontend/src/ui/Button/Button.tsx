import React from 'react';
import styles from './Button.module.scss';

interface Props {}

const Button = (props: Props) => {
  return <button className={styles.Button}>Click me!</button>;
};

export default Button;

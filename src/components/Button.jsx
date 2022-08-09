import React from 'react';
import css from './Button.module.css'

export const Button = ({ children, type = 'primary', ...props }) => {
  return <button className={`${css.main} ${css[type]}`} {...props}>{children}</button>;
};

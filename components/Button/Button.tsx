import React, { memo } from 'react';
import s from './Button.module.scss';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={s.button}>
      {children}
    </button>
  );
};

export default memo(Button);

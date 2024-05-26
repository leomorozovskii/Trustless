import React, { memo } from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  classWrapper?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  classWrapper,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      id={props.id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(s.button, classWrapper, className, s[variant])}
    >
      {children}
    </button>
  );
};

export default memo(Button);

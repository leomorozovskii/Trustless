import React, { memo } from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'ghost';
  type: 'button' | 'submit' | 'reset';
  classWrapper?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  type,
  onClick,
  disabled,
  classWrapper,
  ...props
}) => {
  return (
    <button
      {...props}
      id={props.id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(s.button, classWrapper, s[variant])}
    >
      {children}
    </button>
  );
};

export default memo(Button);

import React, { memo, useMemo } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className,
  ...props
}) => {
  const isIcon = useMemo(() => {
    return React.isValidElement(children) && children.type === 'svg';
  }, [children]);

  return (
    <button
      id={props.id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(s.button, className, s[variant], { [s.icon]: isIcon })}
      {...props}
    >
      {children}
    </button>
  );
};

export default memo(Button);

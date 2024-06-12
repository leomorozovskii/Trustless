import React, { useMemo } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  size = 'md',
  onClick,
  loading = false,
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
      disabled={disabled || loading}
      className={cn(s.button, className, s[variant], {
        [s.icon]: isIcon,
        [s.md]: size === 'md',
        [s.lg]: size === 'lg',
        [s.sm]: size === 'sm',
      })}
      {...props}
    >
      <span className={cn({ [s.loading]: loading })}>{loading ? `${children}...` : children}</span>
    </button>
  );
};

export default Button;

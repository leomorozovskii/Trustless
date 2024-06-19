import cn from 'classnames';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { isValidElement, useMemo } from 'react';

import s from './Button.module.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
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
    return isValidElement(children) && children.type === 'svg';
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

export { Button };

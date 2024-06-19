import React, { useMemo } from 'react';
import cn from 'classnames';

import Link from 'next/link';
import s from './Button.module.scss';

export interface ButtonLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  href: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonLinkProps> = ({
  children,
  variant = 'primary',
  type = 'button',
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
    <Link
      id={props.id}
      type={type}
      onClick={onClick}
      className={cn(s.button, className, s[variant], { [s.icon]: isIcon })}
      data-disabled={disabled}
      {...props}
    >
      <span className={cn({ [s.loading]: loading })}>{children}</span>
    </Link>
  );
};

export default Button;

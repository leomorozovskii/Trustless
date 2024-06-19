import cn from 'classnames';
import Link from 'next/link';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { isValidElement, useMemo } from 'react';

import s from './Button.module.scss';

interface ButtonLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  href: string;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonLink: FC<ButtonLinkProps> = ({
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
    return isValidElement(children) && children.type === 'svg';
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

export { ButtonLink };

import cn from 'classnames';
import Link from 'next/link';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef, isValidElement, useMemo } from 'react';

import s from './Button.module.scss';

type Props = HTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  href: string;
  loading?: boolean;
  disabled?: boolean;
};

const ButtonLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { children, variant = 'primary', type = 'button', onClick, loading = false, disabled = false, className, ...props },
    ref,
  ) => {
    const isIcon = useMemo(() => {
      return isValidElement(children) && children.type === 'svg';
    }, [children]);

    return (
      <Link
        ref={ref}
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
  },
);

export { ButtonLink };

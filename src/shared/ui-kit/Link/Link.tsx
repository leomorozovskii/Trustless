import cn from 'classnames';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import s from './Link.module.scss';

type LinkProps = NextLinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    className?: string;
    children: ReactNode;
    variant?: 'default' | 'underline';
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, className, variant = 'default', ...rest }, ref) => {
  return (
    <NextLink
      {...rest}
      ref={ref}
      className={cn({
        [s.container]: true,
        [s.default]: variant === 'default',
        [s.underline]: variant === 'underline',
        [className as string]: true,
      })}
    >
      {children}
    </NextLink>
  );
});

export { Link };

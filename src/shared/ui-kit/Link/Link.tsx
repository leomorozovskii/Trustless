import cn from 'classnames';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import type { FC, HTMLAttributes, ReactNode } from 'react';

import s from './Link.module.scss';

type LinkProps = NextLinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    className?: string;

    children: ReactNode;
    variant?: 'default' | 'underline';
  };

const Link: FC<LinkProps> = ({ children, className, variant = 'default', ...rest }) => {
  return (
    <NextLink
      {...rest}
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
};

export { Link };

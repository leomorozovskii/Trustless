import React, { memo } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import cn from 'classnames';

import s from './Link.module.scss';

export interface LinkProps
  extends NextLinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'underline';
}

const Link: React.FC<LinkProps> = ({
  children,
  className,
  variant = 'default',
  ...rest
}) => {
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

export default memo(Link);

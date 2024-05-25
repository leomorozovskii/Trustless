import React, { memo } from 'react';
import s from './Link.module.scss';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import cn from 'classnames';

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
        [className]: true,
      })}
    >
      {children}
    </NextLink>
  );
};

export default memo(Link);

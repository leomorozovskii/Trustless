'use client';

import cn from 'classnames';
import { usePathname } from 'next/navigation';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Link } from '@berezka-dao/shared/ui-kit/Link';

import s from './MenuTab.module.scss';

type MenuTabProps = PropsWithChildren<{
  icon: ReactNode;
  active?: boolean;
  disabled?: boolean;
  href: string;
}>;

const MenuTab: FC<MenuTabProps> = ({ children, icon, active = false, disabled = false, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href || active;

  const className = cn(s.container, {
    [s.active]: isActive,
    [s.disabled]: disabled,
  });

  return (
    <Link className={className} href={href}>
      {icon && <span className={s.icon}>{icon}</span>}
      <span className={s.label}>{children}</span>
    </Link>
  );
};

export { MenuTab };

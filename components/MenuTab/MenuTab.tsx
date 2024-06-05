'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import Link from '@components/Link/Link';

import s from './MenuTab.module.scss';

interface MenuTabProps extends React.PropsWithChildren {
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  href: string;
}

const MenuTab: React.FC<MenuTabProps> = ({ children, icon, active = false, disabled = false, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href || active;

  const className = cn(s.container, {
    [s.active]: isActive,
    [s.disabled]: disabled,
  });

  return (
    <Link className={className} href={href}>
      {icon && <span className={s.icon}>{icon}</span>}
      <span className={cn(s.label, { [s.active]: isActive })}>{children}</span>
    </Link>
  );
};

export default MenuTab;

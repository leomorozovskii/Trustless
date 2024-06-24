'use client';

import cn from 'classnames';
import { usePathname } from 'next/navigation';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Drawer } from 'vaul';

import { Link } from '@berezka-dao/shared/ui-kit/Link';

import s from './MobileMenuItem.module.scss';

type MobileMenuItemProps = PropsWithChildren<{
  icon: ReactNode;
  active?: boolean;
  disabled?: boolean;
  href: string;
}>;

const MobileMenuItem: FC<MobileMenuItemProps> = ({ children, icon, active = false, disabled = false, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href || active;

  const className = cn(s.container, {
    [s.active]: isActive,
    [s.disabled]: disabled,
  });

  return (
    <Drawer.Trigger asChild>
      <Link className={className} href={href}>
        {icon && <span className={s.icon}>{icon}</span>}
        <span className={s.label}>{children}</span>
      </Link>
    </Drawer.Trigger>
  );
};

export { MobileMenuItem };

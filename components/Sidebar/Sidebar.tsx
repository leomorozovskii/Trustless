import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';

import { ButtonPlus, HistoryIcon, OfferIcon } from '@assets/icons';
import { MenuTab } from '@components/MenuTab';

import s from './Sidebar.module.scss';

interface SidebarProps extends React.PropsWithChildren {
  contentBg?: 'contrast' | 'default';
}

const Sidebar: React.FC<SidebarProps> = ({ children, contentBg = 'default' }) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const isCreateOffer = useMemo(() => {
    if (!pathname) return;
    return pathname === '/offer/create';
  }, [pathname]);

  return (
    <div className={cn(s.container)}>
      <aside className={cn(s.sidebar)}>
        <div className={s.navigation}>
          <div className={s.buttonContainer}>
            {isCreateOffer ? (
              <a aria-label="Create Offer" className={s.button} href="/offer/create">
                <ButtonPlus />
              </a>
            ) : (
              <Link className={s.button} href="/offer/create">
                <ButtonPlus />
              </Link>
            )}
          </div>
          <div className={s.menu}>
            <MenuTab icon={<OfferIcon />} href="/">
              {t('sidebar.myOffers')}
            </MenuTab>
            <MenuTab icon={<HistoryIcon />} href="/history">
              {t('sidebar.history')}
            </MenuTab>
          </div>
        </div>
        <p className={s.rightsLabel}>© 2024 Berezka DAO</p>
      </aside>
      <div
        className={cn(s.content, {
          [s.content_bg_contrast]: contentBg === 'contrast',
          [s.content_bg_default]: contentBg === 'default',
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;

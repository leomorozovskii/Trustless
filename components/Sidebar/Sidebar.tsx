import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import cn from 'classnames';

import { ButtonPlus, HistoryIcon, OfferIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { MenuTab } from '@components/MenuTab';
import { ROUTES } from '@lib/routes';

import s from './Sidebar.module.scss';

interface SidebarProps extends React.PropsWithChildren {}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
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
              <Button className={s.button} onClick={() => router.push('/offer/create')}>
                <ButtonPlus />
              </Button>
            )}
          </div>
          <div className={s.menu}>
            <MenuTab icon={<OfferIcon />} href={ROUTES.offers}>
              {t('sidebar.myOffers')}
            </MenuTab>
            <MenuTab icon={<HistoryIcon />} href={ROUTES.history}>
              {t('sidebar.history')}
            </MenuTab>
          </div>
        </div>
        <p className={s.rightsLabel}>© 2024 Berezka DAO</p>
      </aside>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default memo(Sidebar);

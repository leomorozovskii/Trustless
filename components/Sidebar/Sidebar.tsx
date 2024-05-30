import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
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

  return (
    <div className={cn(s.container)}>
      <aside className={cn(s.sidebar)}>
        <div className={s.navigation}>
          <div className={s.buttonContainer}>
            <Button onClick={() => router.push('/offer/create')} className={s.button}>
              <ButtonPlus />
            </Button>
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

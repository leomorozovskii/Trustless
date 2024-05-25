import s from './Sidebar.module.scss';
import { Button } from '@components/Button';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { MenuTab } from '@components/MenuTab';
import { HistoryIcon, OfferIcon } from '@assets/icons';
import { ROUTES } from '@lib/routes';

interface SidebarProps extends React.PropsWithChildren {}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(s.container)}>
      <aside className={cn(s.sidebar)}>
        <div className={s.buttonContainer}>
          <Button className={s.button}>
            <span className={s.buttonText}>{t('sidebar.newOffer')}</span>
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
      </aside>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default memo(Sidebar);

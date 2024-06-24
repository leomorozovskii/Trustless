import dayjs from 'dayjs';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer } from 'vaul';

import { HistoryIcon, OfferIcon } from '@berezka-dao/shared/icons';
import { ButtonLink } from '@berezka-dao/shared/ui-kit/Button';

import s from './MobileMenu.module.scss';
import { MobileMenuItem } from '../MobileMenuItem';

const currentYear = dayjs().year();

const MobileMenu: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.buttonContainer}>
          <Drawer.Trigger asChild>
            <ButtonLink href="/offer/create">{t('mobileMenu.createOffer')}</ButtonLink>
          </Drawer.Trigger>
        </div>
        <div className={s.menu}>
          <MobileMenuItem icon={<OfferIcon />} href="/">
            {t('mobileMenu.myOffers')}
          </MobileMenuItem>
          <MobileMenuItem icon={<HistoryIcon />} href="/history">
            {t('mobileMenu.history')}
          </MobileMenuItem>
        </div>
      </div>
      <p className={s.rightsLabel}>© {currentYear} Berezka DAO</p>
    </div>
  );
};

export { MobileMenu };

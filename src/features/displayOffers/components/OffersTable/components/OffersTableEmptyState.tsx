'use client';

import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@berezka-dao/shared/ui-kit/Button';

import s from './OffersTableEmptyState.module.scss';

export const OffersTableEmptyState: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <span className={s.message}>{t('offers.emptyMessage')}</span>
      <div className={s.control}>
        <ButtonLink href="/offer/create">{t('offers.createOffer')}</ButtonLink>
      </div>
    </div>
  );
};

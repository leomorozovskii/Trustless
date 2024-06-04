'use client';

import { useTranslation } from 'react-i18next';

import ButtonLink from '@components/Button/ButtonLink';
import s from './OffersEmptyState.module.scss';

const OffersEmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <span className={s.title}>{t('offers.emptyMessage')}</span>
      <div className={s.create}>
        <ButtonLink href="/offer/create">{t('offers.createOffer')}</ButtonLink>
      </div>
    </div>
  );
};

export { OffersEmptyState };

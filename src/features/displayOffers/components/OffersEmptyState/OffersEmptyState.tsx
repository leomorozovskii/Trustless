'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import pic_no_data from '@public/images/pic_no_data.png';

import { ButtonLink } from '@berezka-dao/shared/ui-kit/Button';

import s from './OffersEmptyState.module.scss';

const OffersEmptyState: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <span className={s.title}>{t('offers.emptyMessage')}</span>
      <div className={s.create}>
        <ButtonLink href="/offer/create">{t('offers.createOffer')}</ButtonLink>
      </div>
      <Image src={pic_no_data} alt="No data" width={600} height={360} />
    </div>
  );
};

export { OffersEmptyState };

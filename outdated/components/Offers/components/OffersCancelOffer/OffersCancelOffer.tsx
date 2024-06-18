'use client';

import React from 'react';

import { useTranslation } from 'react-i18next';
import { ButtonLink } from '@components/Button';
import s from './OffersCancelOffer.module.scss';

type OffersCancelOfferProps = {
  offerId: string | null;
};

const OffersCancelOffer: React.FC<OffersCancelOfferProps> = ({ offerId }) => {
  const { t } = useTranslation();
  return (
    <ButtonLink href={`/offer/cancel/${offerId}`} className={s.container} disabled={!offerId}>
      {t('offers.cancelOffer')}
    </ButtonLink>
  );
};

export { OffersCancelOffer };

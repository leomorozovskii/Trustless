'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@berezka-dao/shared/ui-kit/Button';

import s from './OffersCancelOffer.module.scss';

type OffersCancelOfferProps = {
  offerId: string | null;
};

const OffersCancelOffer: FC<OffersCancelOfferProps> = ({ offerId }) => {
  const { t } = useTranslation();
  return (
    <ButtonLink href={`/offer/cancel/${offerId}`} className={s.container} disabled={!offerId}>
      {t('offers.cancelOffer')}
    </ButtonLink>
  );
};

export { OffersCancelOffer };

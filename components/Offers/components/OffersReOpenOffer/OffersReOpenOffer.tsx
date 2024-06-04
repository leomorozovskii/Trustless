'use client';

import { Button } from '@components/Button';
import { OfferTrade } from '@components/Offers/types';
import { useTranslation } from 'react-i18next';

import s from './OffersReOpenOffer.module.scss';

type OfferReOpenOfferProps = {
  offer: OfferTrade | null;
};

// TODO :: Implement the re-open offer functionality
const OfferReOpenOffer: React.FC<OfferReOpenOfferProps> = ({ offer }) => {
  const { t } = useTranslation();
  return (
    <Button type="button" className={s.container} disabled={!offer}>
      {t('offers.reOpenOffer')}
    </Button>
  );
};

export { OfferReOpenOffer };

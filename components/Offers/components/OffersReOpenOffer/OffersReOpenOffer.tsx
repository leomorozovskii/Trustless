'use client';

import { ButtonLink } from '@components/Button';
import { OfferTrade } from '@components/Offers/types';
import { useTranslation } from 'react-i18next';

import s from './OffersReOpenOffer.module.scss';

type OfferReOpenOfferProps = {
  offer: OfferTrade | null;
};

const OfferReOpenOffer: React.FC<OfferReOpenOfferProps> = ({ offer }) => {
  const { t } = useTranslation();
  const getReOpenOfferUrl = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('tokenFrom', offer?.tokenFromDetails.address || '');
    searchParams.set('amountFrom', offer?.amountFrom.toString() || '');
    searchParams.set('tokenTo', offer?.tokenToDetails.address || '');
    searchParams.set('amountTo', offer?.amountTo.toString() || '');
    searchParams.set('receiver', offer?.receiver || '');
    return `/offer/create?${searchParams.toString()}`;
  };

  return (
    <ButtonLink href={getReOpenOfferUrl()} className={s.container} disabled={!offer}>
      {t('offers.reOpenOffer')}
    </ButtonLink>
  );
};

export { OfferReOpenOffer };

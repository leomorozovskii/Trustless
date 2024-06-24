'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { OfferColumns, createOffersTemplate } from '@berezka-dao/modules/OffersTemplate';

const OffersTemplate = createOffersTemplate({
  filters: ['all', 'pending', 'forMe'],
  actions: ['cancel', 'search'],
  sorting: { field: OfferColumns.Date, order: 'desc' },
  columnsToDisplay: [
    OfferColumns.ID,
    OfferColumns.AssetFrom,
    OfferColumns.AssetTo,
    OfferColumns.AmountFrom,
    OfferColumns.AmountTo,
    OfferColumns.Rate,
    OfferColumns.TxHash,
    OfferColumns.Status,
    OfferColumns.Receiver,
    OfferColumns.Date,
    OfferColumns.Share,
  ],
});

const OffersPage: FC = () => {
  const { t } = useTranslation();
  return <OffersTemplate title={t('offers.title.myOffers')} />;
};

export default OffersPage;

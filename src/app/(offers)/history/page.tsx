'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { OfferColumns, createOffersTemplate } from '@berezka-dao/modules/OffersTemplate';

const OffersTemplate = createOffersTemplate({
  filters: ['all', 'accepted', 'cancelled', 'acceptedByMe'],
  actions: ['re-open', 'search'],
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
  ],
});

const HistoryPage: FC = () => {
  const { t } = useTranslation();
  return <OffersTemplate title={t('offers.title.history')} />;
};

export default HistoryPage;

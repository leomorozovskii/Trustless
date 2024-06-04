'use client';

import React from 'react';

import { createOffersTemplate } from '@components/Offers';
import { OfferColumns } from '@components/Offers/types';
import { useTranslation } from 'react-i18next';

const OffersTemplate = createOffersTemplate({
  filters: ['all', 'open'],
  hideFilters: true,
  actions: ['cancel', 'search'],
  columnsToDisplay: [
    OfferColumns.ID,
    OfferColumns.AssetFrom,
    OfferColumns.AssetTo,
    OfferColumns.AmountFrom,
    OfferColumns.AmountTo,
    OfferColumns.Rate,
    OfferColumns.Address,
    OfferColumns.Status,
    OfferColumns.Share,
  ],
});

const OffersPage: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTemplate title={t('offers.title.myOffers')} />;
};

export default OffersPage;

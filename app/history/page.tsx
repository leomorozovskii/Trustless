'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

import { createOffersTemplate } from '@components/Offers';
import { OfferColumns } from '@components/Offers/types';
import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import { NotConnectedMessage } from '@components/NotConnectedMessage';
import { useIsMounted } from '@lib/hooks/useIsMounted';

const OffersTemplate = createOffersTemplate({
  filters: ['all', 'accepted', 'cancelled'],
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

const HistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  if (!isConnected) {
    return (
      <div>
        <Header />
        <NotConnectedMessage />
      </div>
    );
  }
  return (
    <Sidebar contentBg="contrast">
      <Header />
      <OffersTemplate title={t('offers.title.history')} />
    </Sidebar>
  );
};

export default HistoryPage;

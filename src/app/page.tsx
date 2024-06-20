'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

import { OfferColumns, createOffersTemplate } from '@berezka-dao/modules/OffersTemplate';

import { HeaderLayout } from '../layouts/HeaderLayout';
import { TabsLayout } from '../layouts/TabsLayout';
import { NotConnectedMessage } from '../shared/components/NotConnectedMessage';
import { useIsMounted } from '../shared/hooks/useIsMounted';

const OffersTemplate = createOffersTemplate({
  filters: ['all', 'pending'],
  actions: ['cancel', 'search'],
  sorting: { field: OfferColumns.Date, order: 'desc' },
  hideFilters: true,
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
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  if (!isConnected) {
    return (
      <HeaderLayout>
        <NotConnectedMessage />
      </HeaderLayout>
    );
  }
  return (
    <TabsLayout contentBg="contrast">
      <HeaderLayout>
        <OffersTemplate title={t('offers.title.myOffers')} />
      </HeaderLayout>
    </TabsLayout>
  );
};

export default OffersPage;

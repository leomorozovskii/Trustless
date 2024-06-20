'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';

import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { OfferColumns, createOffersTemplate } from '@berezka-dao/modules/OffersTemplate';
import { NotConnectedMessage } from '@berezka-dao/shared/components/NotConnectedMessage';
import { useIsMounted } from '@berezka-dao/shared/hooks/useIsMounted';

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

const HistoryPage: FC = () => {
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
    <TabsLayout>
      <HeaderLayout>
        <OffersTemplate title={t('offers.title.history')} />
      </HeaderLayout>
    </TabsLayout>
  );
};

export default HistoryPage;

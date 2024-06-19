'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { OffersTableCell } from './OffersTableCell';

const OffersTableIdHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.id')}</OffersTableCell>;
};

const OffersTableAssetFromHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.assetFrom')}</OffersTableCell>;
};

const OffersTableAssetToHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.assetTo')}</OffersTableCell>;
};

const OffersTableAmountFromHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.amountFrom')}</OffersTableCell>;
};

const OffersTableAmountToHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.amountTo')}</OffersTableCell>;
};

const OffersTableRateHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.rate')}</OffersTableCell>;
};

const OffersTableTxHashHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.txHash')}</OffersTableCell>;
};

const OffersTableStatusHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.status')}</OffersTableCell>;
};

const OffersTableDateHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.date')}</OffersTableCell>;
};

const OffersTableShareHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.share')}</OffersTableCell>;
};

const OffersTableReceiverHeading: FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.receiver')}</OffersTableCell>;
};

export {
  OffersTableIdHeading,
  OffersTableAssetFromHeading,
  OffersTableAssetToHeading,
  OffersTableAmountFromHeading,
  OffersTableAmountToHeading,
  OffersTableRateHeading,
  OffersTableTxHashHeading,
  OffersTableStatusHeading,
  OffersTableShareHeading,
  OffersTableDateHeading,
  OffersTableReceiverHeading,
};

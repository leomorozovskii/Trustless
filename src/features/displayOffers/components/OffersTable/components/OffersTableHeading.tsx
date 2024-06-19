'use client';

import { useTranslation } from 'react-i18next';

import { OffersTableCell } from './OffersTableCell';

const OffersTableIdHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.id')}</OffersTableCell>;
};

const OffersTableAssetFromHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.assetFrom')}</OffersTableCell>;
};

const OffersTableAssetToHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.assetTo')}</OffersTableCell>;
};

const OffersTableAmountFromHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.amountFrom')}</OffersTableCell>;
};

const OffersTableAmountToHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.amountTo')}</OffersTableCell>;
};

const OffersTableRateHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.rate')}</OffersTableCell>;
};

const OffersTableTxHashHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.txHash')}</OffersTableCell>;
};

const OffersTableStatusHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.status')}</OffersTableCell>;
};

const OffersTableDateHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.date')}</OffersTableCell>;
};

const OffersTableShareHeading: React.FC = () => {
  const { t } = useTranslation();
  return <OffersTableCell>{t('offers.table.headings.share')}</OffersTableCell>;
};

const OffersTableReceiverHeading: React.FC = () => {
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

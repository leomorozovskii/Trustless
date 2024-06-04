'use client';

import { OfferStatus } from '@components/Offers/types';
import { CopyText } from '@components/CopyText';

import { useTranslation } from 'react-i18next';
import FormattedNumber from '@components/FormattedAmount/FormattedAmount';
import { ShareIcon } from '@assets/icons';
import Link from 'next/link';
import { OffersTableCell } from './OffersTableCell';
import s from './OffersTableCell.module.scss';

type OffersTableIdProps = {
  id: string;
};

const OffersTableId: React.FC<OffersTableIdProps> = ({ id }) => {
  return <OffersTableCell>{id}</OffersTableCell>;
};

type OffersTableAssetProps = {
  name: string;
  icon: React.ReactNode;
};

const OffersTableAsset: React.FC<OffersTableAssetProps> = ({ name, icon }) => {
  return (
    <OffersTableCell>
      {icon}
      <span className={s.token}>{name}</span>
    </OffersTableCell>
  );
};

type OffersTableAmountProps = {
  amount: number;
};

const OffersTableAmount: React.FC<OffersTableAmountProps> = ({ amount }) => {
  return (
    <OffersTableCell>
      <FormattedNumber value={amount} />
    </OffersTableCell>
  );
};

type OffersTableRateProps = {
  rate: number;
};

const OffersTableRate: React.FC<OffersTableRateProps> = ({ rate }) => {
  return (
    <OffersTableCell>
      <FormattedNumber value={rate} />
    </OffersTableCell>
  );
};

type OffersTableAddressProps = {
  address: string;
};

const OffersTableAddress: React.FC<OffersTableAddressProps> = ({ address }) => {
  const { t } = useTranslation();
  return (
    <OffersTableCell>
      <span className={s.address}>{`${address.slice(0, 4)}...${address.slice(-6)}`}</span>
      <CopyText text={address} successMessage={t('success.addressCopied')} />
    </OffersTableCell>
  );
};

type OffersTableStatusProps = {
  status: OfferStatus;
};

const OffersTableStatus: React.FC<OffersTableStatusProps> = ({ status }) => {
  const { t } = useTranslation();
  return <OffersTableCell>{t(`offers.table.status.${status}`)}</OffersTableCell>;
};

type OffersTableShareProps = {
  id: string;
};

const OffersTableShare: React.FC<OffersTableShareProps> = ({ id }) => {
  return (
    <OffersTableCell>
      <Link href={`/share/${id}`}>
        <ShareIcon />
      </Link>
    </OffersTableCell>
  );
};

export {
  OffersTableId,
  OffersTableAsset,
  OffersTableAmount,
  OffersTableRate,
  OffersTableAddress,
  OffersTableStatus,
  OffersTableShare,
};

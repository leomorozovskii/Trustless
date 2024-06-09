'use client';

import { OfferStatus } from '@components/Offers/types';
import { CopyText } from '@components/CopyText';

import { useTranslation } from 'react-i18next';
import FormattedNumber from '@components/FormattedAmount/FormattedAmount';
import { ShareIcon } from '@assets/icons';
import Link from 'next/link';
import { TxLink } from '@components/TxLink';
import { Hash } from 'viem';
import { links } from '@lib/constants';
import dayjs from 'dayjs';
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

type OffersTableAmountFromProps = {
  amount: number;
  amountWithFee: number;
};

const OffersTableAmountFrom: React.FC<OffersTableAmountFromProps> = ({ amount, amountWithFee }) => {
  const { t } = useTranslation();
  return (
    <OffersTableCell
      column
      secondaryText={
        amount !== amountWithFee && (
          <FormattedNumber
            value={amount - amountWithFee}
            className={s.cell__text_small}
            formatValue={(value) => t('offers.table.cell.amountWithFee', { amount: value })}
          />
        )
      }
    >
      <FormattedNumber value={amountWithFee} />
    </OffersTableCell>
  );
};

type OffersTableAmountToProps = {
  amount: number;
};

const OffersTableAmountTo: React.FC<OffersTableAmountToProps> = ({ amount }) => {
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
      <FormattedNumber value={rate} minimumFractionDigits={0} />
    </OffersTableCell>
  );
};

type OffersTableTxHashProps = {
  hash: Hash;
};

const OffersTableTxHash: React.FC<OffersTableTxHashProps> = ({ hash }) => {
  const { t } = useTranslation();
  return (
    <OffersTableCell full>
      <span>{`${hash.slice(0, 4)}...${hash.slice(-6)}`}</span>
      <span className={s.controls}>
        <TxLink hash={hash} />
        <CopyText text={`${links.etherscan}/tx/${hash}`} successMessage={t('success.txLinkCopied')} />
      </span>
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

type OffersTableDateProps = {
  unixTimestamp: number;
};

const OffersTableDate: React.FC<OffersTableDateProps> = ({ unixTimestamp }) => {
  return <OffersTableCell uppercase>{dayjs.unix(unixTimestamp).format('DD MMM YYYY HH:mm')}</OffersTableCell>;
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
  OffersTableAmountFrom,
  OffersTableAmountTo,
  OffersTableRate,
  OffersTableTxHash,
  OffersTableStatus,
  OffersTableShare,
  OffersTableDate,
};

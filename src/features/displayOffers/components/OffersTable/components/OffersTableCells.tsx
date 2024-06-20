'use client';

import dayjs from 'dayjs';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Hash } from 'viem';

import { links } from '@berezka-dao/core/constants';
import { environment } from '@berezka-dao/core/environment';
import { isEmptyAddress } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/utils/utils';
import type { OfferStatus } from '@berezka-dao/features/displayOffers/types';
import { TxLink } from '@berezka-dao/shared/components/TxLink';
import { ShareIcon } from '@berezka-dao/shared/icons';
import { CopyText } from '@berezka-dao/shared/ui-kit/CopyText';
import { FormattedNumber } from '@berezka-dao/shared/ui-kit/FormattedAmount';

import { OffersTableCell } from './OffersTableCell';
import s from './OffersTableCell.module.scss';

type OffersTableIdProps = {
  id: string;
};

const OffersTableId: FC<OffersTableIdProps> = ({ id }) => {
  return <OffersTableCell>{id}</OffersTableCell>;
};

type OffersTableAssetProps = {
  name: string;
  icon: ReactNode;
};

const OffersTableAsset: FC<OffersTableAssetProps> = ({ name, icon }) => {
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

const OffersTableAmountFrom: FC<OffersTableAmountFromProps> = ({ amount, amountWithFee }) => {
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

const OffersTableAmountTo: FC<OffersTableAmountToProps> = ({ amount }) => {
  return (
    <OffersTableCell>
      <FormattedNumber value={amount} />
    </OffersTableCell>
  );
};

type OffersTableRateProps = {
  rate: number;
};

const OffersTableRate: FC<OffersTableRateProps> = ({ rate }) => {
  return (
    <OffersTableCell>
      <FormattedNumber value={rate} minimumFractionDigits={0} />
    </OffersTableCell>
  );
};

type OffersTableTxHashProps = {
  hash: Hash;
};

const OffersTableTxHash: FC<OffersTableTxHashProps> = ({ hash }) => {
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

const OffersTableStatus: FC<OffersTableStatusProps> = ({ status }) => {
  const { t } = useTranslation();
  return <OffersTableCell>{t(`offers.table.status.${status}`)}</OffersTableCell>;
};

type OffersTableDateProps = {
  unixTimestamp: number;
};

const OffersTableDate: FC<OffersTableDateProps> = ({ unixTimestamp }) => {
  return (
    <OffersTableCell uppercase small>
      {dayjs.unix(unixTimestamp).format('DD MMM YYYY HH:mm')}
    </OffersTableCell>
  );
};

type OffersTableShareProps = {
  id: string;
};

const OffersTableShare: FC<OffersTableShareProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <OffersTableCell>
      <CopyText text={`${environment.siteUrl}/offers/${id}`} successMessage={t(`success.offerLinkCopied`)}>
        <ShareIcon />
      </CopyText>
    </OffersTableCell>
  );
};

const OffersTableReceiver: FC<{ receiver: string }> = ({ receiver }) => {
  const { t } = useTranslation();
  return (
    <OffersTableCell>
      {!isEmptyAddress(receiver) && (
        <>
          {`${receiver.slice(0, 4)}...${receiver.slice(-6)}`}
          <CopyText text={receiver} successMessage={t('success.addressCopied')} />
        </>
      )}
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
  OffersTableReceiver,
};

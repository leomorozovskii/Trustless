'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { links } from '@berezka-dao/core/constants';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { NewWindowIcon, SmallArrow, SuccessAcceptIcon } from '@berezka-dao/shared/icons';

import s from './AcceptedOffer.module.scss';

const AcceptedOffer: FC = () => {
  const { t } = useTranslation();
  const { txHash, acceptId } = useOfferAcceptContext();
  const { tokenFrom, tokenTo, amountTo, amountFrom, rateToFrom } = useGetOfferDetails({ id: acceptId });

  return (
    <div className={s.wrapper}>
      <SuccessAcceptIcon />
      <div className={s.labelContainer}>
        <h2 className={s.label}>
          {tokenTo?.symbol} {amountTo}
        </h2>
        <SmallArrow />
        <h2 className={s.label}>
          {tokenFrom?.symbol} {amountFrom}
        </h2>
        <h2 className={s.label}>
          {t('offer.accept.rate')} {rateToFrom}
        </h2>
      </div>
      <Link target="_blank" rel="noreferrer" href={`${links.etherscan}/tx/${txHash}`} className={s.share}>
        <p className={s.shareLabel}>{t('offer.accept.view')}</p>
        <NewWindowIcon />
      </Link>
      <Link href="/" className={s.button}>
        {t('offer.accept.great')}
      </Link>
    </div>
  );
};

export { AcceptedOffer };

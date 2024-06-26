'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { links } from '@berezka-dao/core/constants';
import { NewWindowIcon, SmallArrow, SuccessAcceptIcon } from '@berezka-dao/shared/icons';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';

import s from './AcceptedOffer.module.scss';
import { useOfferAcceptContext } from '../../store';

const AcceptedOffer: FC = () => {
  const { t } = useTranslation();
  const { txHash, acceptId } = useOfferAcceptContext();
  const { tokenFrom, tokenTo, formattedAmountTo, formattedAmountFrom, rateToFrom } = useGetOfferDetails({
    id: acceptId,
  });

  return (
    <div className={s.wrapper}>
      <SuccessAcceptIcon />
      <div className={s.labelContainer}>
        <h2 className={s.label}>
          {formattedAmountTo} {tokenTo?.symbol}
        </h2>
        <SmallArrow />
        <h2 className={s.label}>
          {formattedAmountFrom} {tokenFrom?.symbol}
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

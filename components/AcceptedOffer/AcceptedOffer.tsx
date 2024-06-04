'use client';

import React, { memo } from 'react';
import { useRouter } from 'next/navigation';

import { NewWindowIcon, SmallArrow, SuccessAcceptIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferContext } from '@context/offer/OfferContext';
import { OfferProgress } from '@lib/constants';

import s from './AcceptedOffer.module.scss';

const AcceptedOffer: React.FC = () => {
  const router = useRouter();
  const { setActiveAcceptStep } = useOfferContext();
  const { tokenFrom, tokenTo, amountTo, amountFrom, rate } = useGetOfferDetails();
  const { tokenName: tokenFromName, tokenValue: tokenFromValue } = useTokenInfo(tokenFrom, amountFrom);
  const { tokenName: tokenToName, tokenValue: tokenToValue } = useTokenInfo(tokenTo, amountTo);

  const handleClose = () => {
    setActiveAcceptStep(OfferProgress.Filled);
    router.push('/offers');
  };

  return (
    <div className={s.wrapper}>
      <SuccessAcceptIcon />
      <div className={s.labelContainer}>
        <h2 className={s.label}>
          {tokenToName} {tokenToValue}
        </h2>
        <SmallArrow onClick={handleClose} />
        <h2 className={s.label}>
          {tokenFromName} {tokenFromValue}
        </h2>
        <h2 className={s.label}>Rate {rate}</h2>
      </div>
      {/* TODO add link here */}
      <button aria-label="View transaction" className={s.share}>
        <p className={s.shareLabel}>View transaction</p>
        <NewWindowIcon />
      </button>
      <Button onClick={handleClose} className={s.button}>
        Great!
      </Button>
    </div>
  );
};

export default memo(AcceptedOffer);

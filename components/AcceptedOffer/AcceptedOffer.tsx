'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { NewWindowIcon, SmallArrow, SuccessAcceptIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { links } from '@lib/constants';

import { environment } from '@/environment';
import s from './AcceptedOffer.module.scss';

const AcceptedOffer: React.FC = () => {
  const router = useRouter();
  const { txHash } = useOfferAcceptContext();
  const { tokenFrom, tokenTo, amountTo, amountFrom, rateToFrom } = useGetOfferDetails();
  const { tokenName: tokenFromName, tokenValue: tokenFromValue } = useTokenInfo(tokenFrom, amountFrom);
  const { tokenName: tokenToName, tokenValue: tokenToValue } = useTokenInfo(tokenTo, amountTo);

  const handleClose = () => {
    router.push('/offers');
  };

  const handleViewTransaction = () => {
    if (!txHash) return;
    if (typeof window === 'undefined') return;
    const link = environment.nodeEnv === 'development' ? links.sepoliaEtherscan : links.etherscan;
    window.open(`${link}/tx/${txHash}`);
  };

  return (
    <div className={s.wrapper}>
      <SuccessAcceptIcon />
      <div className={s.labelContainer}>
        <h2 className={s.label}>
          {tokenToName} {tokenToValue}
        </h2>
        <SmallArrow />
        <h2 className={s.label}>
          {tokenFromName} {tokenFromValue}
        </h2>
        <h2 className={s.label}>Rate {rateToFrom}</h2>
      </div>
      <button aria-label="View transaction" onClick={handleViewTransaction} className={s.share}>
        <p className={s.shareLabel}>View transaction</p>
        <NewWindowIcon />
      </button>
      <Button onClick={handleClose} className={s.button}>
        Great!
      </Button>
    </div>
  );
};

export default AcceptedOffer;

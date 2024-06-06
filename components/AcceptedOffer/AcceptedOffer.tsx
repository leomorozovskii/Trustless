'use client';

import React from 'react';
import Link from 'next/link';

import { NewWindowIcon, SmallArrow, SuccessAcceptIcon } from '@assets/icons';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { links } from '@lib/constants';

import s from './AcceptedOffer.module.scss';

const AcceptedOffer: React.FC = () => {
  const { txHash } = useOfferAcceptContext();
  const { tokenFrom, tokenTo, amountTo, amountFrom, rateToFrom } = useGetOfferDetails();
  const { tokenName: tokenFromName, tokenValue: tokenFromValue } = useTokenInfo(tokenFrom, amountFrom);
  const { tokenName: tokenToName, tokenValue: tokenToValue } = useTokenInfo(tokenTo, amountTo);

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
      <Link target="_blank" rel="noreferrer" href={`${links.etherscan}/tx/${txHash}`} className={s.share}>
        <p className={s.shareLabel}>View transaction</p>
        <NewWindowIcon />
      </Link>
      <Link href="/offers" className={s.button}>
        Great!
      </Link>
    </div>
  );
};

export default AcceptedOffer;

'use client';

import Link from 'next/link';
import React from 'react';

import { links } from '@berezka-dao/core/constants';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useTokenInfo';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { NewWindowIcon, SmallArrow, SuccessAcceptIcon } from '@berezka-dao/shared/icons';

import s from './AcceptedOffer.module.scss';

const AcceptedOffer: React.FC = () => {
  const { txHash, acceptId } = useOfferAcceptContext();
  const { tokenFrom, tokenTo, amountTo, amountFrom, rateToFrom } = useGetOfferDetails({ id: acceptId });
  const { tokenName: tokenFromName, tokenValue: tokenFromValue } = useTokenInfo({
    address: tokenFrom,
    amount: amountFrom,
  });
  const { tokenName: tokenToName, tokenValue: tokenToValue } = useTokenInfo({ address: tokenTo, amount: amountTo });

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
      <Link href="/" className={s.button}>
        Great!
      </Link>
    </div>
  );
};

export { AcceptedOffer };

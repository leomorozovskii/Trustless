import React from 'react';

import { RateContainer } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/components/RateContainer';
import { TokenEntity } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/components/TokenEntity';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { AcceptOfferIcon } from '@berezka-dao/shared/icons';

import s from '../AcceptOffer.module.scss';

const TokensContainer: React.FC = () => {
  const { acceptId } = useOfferAcceptContext();
  const { tokenFrom, amountFrom, tokenTo, amountTo, rateToFrom } = useGetOfferDetails({ id: acceptId });

  return (
    <div className={s.offerWrapper}>
      <div className={s.arrowContainer}>
        <TokenEntity type="pay" address={tokenTo} amount={amountTo} />
        <AcceptOfferIcon />
        <TokenEntity type="get" address={tokenFrom} amount={amountFrom} />
      </div>
      <RateContainer value={rateToFrom} />
    </div>
  );
};

export { TokensContainer };

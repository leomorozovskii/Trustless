import React, { memo } from 'react';

import { AcceptOfferIcon } from '@assets/icons';
import RateContainer from '@components/AcceptOffer/components/RateContainer';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import TokenEntity from '@components/AcceptOffer/components/TokenEntity';

import s from '../AcceptOffer.module.scss';

const TokensContainer: React.FC = () => {
  const { tokenFrom, amountFrom, tokenTo, amountTo, rate } = useGetOfferDetails();

  return (
    <div className={s.offerWrapper}>
      <div className={s.arrowContainer}>
        <TokenEntity type="pay" address={tokenTo} amount={amountTo} />
        <AcceptOfferIcon />
        <TokenEntity type="get" address={tokenFrom} amount={amountFrom} />
      </div>
      <RateContainer value={rate} />
    </div>
  );
};

export default memo(TokensContainer);

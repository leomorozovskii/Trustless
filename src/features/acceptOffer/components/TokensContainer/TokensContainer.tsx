import type { FC } from 'react';

import { AcceptOfferIcon } from '@berezka-dao/shared/icons';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';

import s from './TokensContainer.module.scss';
import { useOfferAcceptContext } from '../../store';
import { RateContainer } from '../RateContainer';
import { TokenEntity } from '../TokenEntity';

const TokensContainer: FC = () => {
  const { acceptId } = useOfferAcceptContext();
  const { tokenFrom, formattedAmountFrom, tokenTo, formattedAmountTo, rateToFrom } = useGetOfferDetails({
    id: acceptId,
  });

  return (
    <div className={s.offerWrapper}>
      <div className={s.arrowContainer}>
        <TokenEntity type="pay" address={tokenTo?.address} amount={formattedAmountTo} name={tokenTo?.symbol} />
        <AcceptOfferIcon />
        <TokenEntity type="get" address={tokenFrom?.address} amount={formattedAmountFrom} name={tokenFrom?.symbol} />
      </div>
      <RateContainer value={rateToFrom} />
    </div>
  );
};

export { TokensContainer };

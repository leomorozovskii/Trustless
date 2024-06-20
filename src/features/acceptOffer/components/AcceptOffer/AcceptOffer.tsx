'use client';

import { Skeleton } from '@radix-ui/themes';
import cn from 'classnames';
import type { FC } from 'react';

import { isEmptyAddress } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/utils/utils';

import s from './AcceptOffer.module.scss';
import { CustomTokenWarning } from './components/CustomTokenWarning';
import { ReceiverContainer } from './components/ReceiverContainer';
import { TokensContainer } from './components/TokensContainer';
import { useGetOfferDetails } from './hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '../../store';

const AcceptOffer: FC = () => {
  const { acceptId } = useOfferAcceptContext();
  const { isTokenFromCustom, tokenFrom, isLoading, optionalTaker } = useGetOfferDetails({ id: acceptId });

  return (
    <Skeleton loading={isLoading}>
      <div className={cn(s.container, { [s.paddingLg]: isTokenFromCustom })}>
        <TokensContainer />
        {!isEmptyAddress(optionalTaker) && <ReceiverContainer receiver={optionalTaker} />}
        {isTokenFromCustom && <CustomTokenWarning address={tokenFrom?.address} name={tokenFrom?.symbol} />}
      </div>
    </Skeleton>
  );
};

export { AcceptOffer };

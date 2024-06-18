'use client';

import { Skeleton } from '@radix-ui/themes';
import cn from 'classnames';
import React from 'react';

import s from './AcceptOffer.module.scss';
import { CustomTokenWarning } from './components/CustomTokenWarning';
import { ReceiverContainer } from './components/ReceiverContainer';
import { TokensContainer } from './components/TokensContainer';
import { useGetOfferDetails } from './hooks/useGetOfferDetails';
import { useTokenInfo } from './hooks/useTokenInfo';
import { isEmptyAddress } from './utils/isEmptyAddress';
import { useOfferAcceptContext } from '../../store';

const AcceptOffer: React.FC = () => {
  const { acceptId } = useOfferAcceptContext();
  const { isTokenFromCustom, tokenFrom, isLoading, receiver } = useGetOfferDetails({ id: acceptId });
  const { tokenName } = useTokenInfo({ address: tokenFrom });

  return (
    <Skeleton loading={isLoading}>
      <div className={cn(s.container, { [s.paddingLg]: isTokenFromCustom })}>
        <TokensContainer />
        {!isEmptyAddress(receiver) && <ReceiverContainer receiver={receiver} />}
        {isTokenFromCustom && <CustomTokenWarning address={tokenFrom} name={tokenName} />}
      </div>
    </Skeleton>
  );
};

export { AcceptOffer };

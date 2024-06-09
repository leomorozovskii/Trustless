'use client';

import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import cn from 'classnames';

import TokensContainer from '@components/AcceptOffer/components/TokensContainer';
import ReceiverContainer from '@components/AcceptOffer/components/ReceiverContainer';
import CustomTokenWarning from '@components/AcceptOffer/components/CustomTokenWarning';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { isEmptyAddress } from '@components/AcceptOffer/utils/isEmptyAddress';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';

import s from './AcceptOffer.module.scss';

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

export default AcceptOffer;

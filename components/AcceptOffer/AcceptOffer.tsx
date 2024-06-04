'use client';

import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import cn from 'classnames';

import TokensContainer from '@components/AcceptOffer/components/TokensContainer';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import ReceiverContainer from '@components/AcceptOffer/components/ReceiverContainer';
import CustomTokenWarning from '@components/AcceptOffer/components/CustomTokenWarning';

import s from './AcceptOffer.module.scss';

const AcceptOffer: React.FC = () => {
  const { isLoading } = useGetOfferDetails();
  const { isTokenFromCustom, tokenFrom } = useGetOfferDetails();
  const { tokenName } = useTokenInfo(tokenFrom);

  return (
    <Skeleton loading={isLoading}>
      <div className={cn(s.container, { [s.paddingLg]: isTokenFromCustom })}>
        <TokensContainer />
        <ReceiverContainer />
        {isTokenFromCustom && <CustomTokenWarning address={tokenFrom} name={tokenName} />}
      </div>
    </Skeleton>
  );
};

export default AcceptOffer;

'use client';

import React from 'react';
import { Skeleton } from '@radix-ui/themes';

import TokensContainer from '@components/AcceptOffer/components/TokensContainer';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import ReceiverContainer from '@components/AcceptOffer/components/ReceiverContainer';
import { useOfferContext } from '@context/offer/OfferContext';

import s from './AcceptOffer.module.scss';

const AcceptOffer: React.FC = () => {
  const { acceptId } = useOfferContext();
  const { isLoading } = useGetOfferDetails({ acceptId });

  return (
    <Skeleton loading={isLoading}>
      <div className={s.container}>
        <TokensContainer />
        <ReceiverContainer />
      </div>
    </Skeleton>
  );
};

export default AcceptOffer;

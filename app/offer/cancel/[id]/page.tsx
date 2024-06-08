'use client';

import React, { useEffect } from 'react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import CancelOffer from '@components/CancelOffer/CancelOffer';
import CancelInfo from '@components/CancelOffer/components/CancelInfo/CancelInfo';
import { OfferCancelProvider, useOfferCancelContext } from '@context/offer/cancel/OfferCancelContext';

import s from './CancelOffer.module.scss';

const CancelOfferPageContent = ({ params }: { params: { id: string } }) => {
  const { setCancelId } = useOfferCancelContext();

  useEffect(() => {
    if (params.id) {
      setCancelId(params.id);
    }
  }, [params]);

  return (
    <Sidebar>
      <Header />
      <div className={s.container}>
        <div className={s.heading}>
          <h2 className={s.label}>Cancel offer #{params.id}</h2>
        </div>
        <CancelInfo />
        <CancelOffer />
      </div>
    </Sidebar>
  );
};

const CancelOfferPage = ({ params }: { params: { id: string } }) => (
  <OfferCancelProvider>
    <CancelOfferPageContent params={params} />
  </OfferCancelProvider>
);

export default CancelOfferPage;

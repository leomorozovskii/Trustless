'use client';

import React from 'react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import CancelOffer from '@components/CancelOffer/CancelOffer';
import CancelInfo from '@components/CancelOffer/components/CancelInfo/CancelInfo';

import s from './CancelOffer.module.scss';

const CancelOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <Sidebar>
      <Header />
      <div className={s.container}>
        <div className={s.heading}>
          <h2 className={s.label}>Cancel offer #{params.id}</h2>
        </div>
        <CancelInfo cancelId={params.id} />
        <CancelOffer cancelId={params.id} />
      </div>
    </Sidebar>
  );
};

export default CancelOfferPage;

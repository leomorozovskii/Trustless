'use client';

import React from 'react';

import { ShareOfferContainer } from '@components/ShareOfferContainer';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

import s from './Share.module.scss';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Sidebar>
      <Header />
      <div className={s.container}>
        <h2 className={s.title}>Share your offer</h2>
        <ShareOfferContainer offerId={params.id} />
      </div>
    </Sidebar>
  );
};

export default Page;

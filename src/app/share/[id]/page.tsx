'use client';

import React from 'react';

import { ShareOfferContainer } from '@berezka-dao/features/shareOffer/components/ShareOfferContainer';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';

import s from './Share.module.scss';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <TabsLayout>
      <HeaderLayout>
        <div className={s.container}>
          <h2 className={s.title}>Share your offer</h2>
          <ShareOfferContainer offerId={params.id} />
        </div>
      </HeaderLayout>
    </TabsLayout>
  );
};

export default Page;

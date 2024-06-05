import React from 'react';

import { ShareOfferContainer } from '@components/ShareOfferContainer';

import s from './Share.module.scss';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Share your offer</h2>
      <ShareOfferContainer offerId={params.id} />
    </div>
  );
};

export default Page;

'use client';

import { ShareOfferTemplate } from '@berezka-dao/modules/ShareOfferTemplate';

const ShareOfferPage = ({ params }: { params: { id: string } }) => {
  return <ShareOfferTemplate id={params.id} />;
};

export default ShareOfferPage;

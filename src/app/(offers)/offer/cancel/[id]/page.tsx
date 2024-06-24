'use client';

import { CancelOfferTemplate } from '@berezka-dao/modules/CancelOfferTemplate';

const CancelOfferPage = ({ params }: { params: { id: string } }) => {
  return <CancelOfferTemplate id={params.id} />;
};

export default CancelOfferPage;

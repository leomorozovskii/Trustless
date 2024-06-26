'use client';

import { OfferAcceptProvider } from '@berezka-dao/features/acceptOffer';
import { AcceptOfferTemplate } from '@berezka-dao/modules/AcceptOfferTemplate';

const AcceptOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <OfferAcceptProvider id={params.id}>
      <AcceptOfferTemplate id={params.id} />
    </OfferAcceptProvider>
  );
};

export default AcceptOfferPage;

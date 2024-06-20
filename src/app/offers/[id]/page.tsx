'use client';

import { OfferAcceptProvider } from '@berezka-dao/features/acceptOffer';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { AcceptOfferTemplate } from '@berezka-dao/modules/AcceptOfferTemplate';

const AcceptOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <OfferAcceptProvider id={params.id}>
      <TabsLayout>
        <HeaderLayout>
          <AcceptOfferTemplate id={params.id} />
        </HeaderLayout>
      </TabsLayout>
    </OfferAcceptProvider>
  );
};

export default AcceptOfferPage;

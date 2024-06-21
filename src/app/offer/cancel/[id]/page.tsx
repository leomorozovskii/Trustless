'use client';

import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { CancelOfferTemplate } from '@berezka-dao/modules/CancelOfferTemplate';

const CancelOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <TabsLayout>
      <HeaderLayout>
        <CancelOfferTemplate id={params.id} />
      </HeaderLayout>
    </TabsLayout>
  );
};

export default CancelOfferPage;

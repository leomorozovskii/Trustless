'use client';

import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { ShareOfferTemplate } from '@berezka-dao/modules/ShareOfferTemplate';

const ShareOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <TabsLayout>
      <HeaderLayout>
        <ShareOfferTemplate id={params.id} />
      </HeaderLayout>
    </TabsLayout>
  );
};

export default ShareOfferPage;

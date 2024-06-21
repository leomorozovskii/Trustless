'use client';

import type { FC } from 'react';

import { OfferCreateProvider } from '@berezka-dao/features/createOffer';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { CreateOfferTemplate } from '@berezka-dao/modules/CreateOfferTemplate';

const CreateOfferPage: FC = () => {
  return (
    <OfferCreateProvider>
      <TabsLayout>
        <HeaderLayout>
          <CreateOfferTemplate />
        </HeaderLayout>
      </TabsLayout>
    </OfferCreateProvider>
  );
};

export default CreateOfferPage;

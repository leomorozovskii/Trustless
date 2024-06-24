'use client';

import type { FC } from 'react';

import { OfferCreateProvider } from '@berezka-dao/features/createOffer';
import { CreateOfferTemplate } from '@berezka-dao/modules/CreateOfferTemplate';

const CreateOfferPage: FC = () => {
  return (
    <OfferCreateProvider>
      <CreateOfferTemplate />
    </OfferCreateProvider>
  );
};

export default CreateOfferPage;

'use client';

import { CancelOffer } from '@berezka-dao/features/cancelOffer';
import { CancelInfo } from '@berezka-dao/features/cancelOffer/components/CancelInfo/CancelInfo';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';

import s from './CancelOffer.module.scss';

const CancelOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <TabsLayout>
      <HeaderLayout>
        <div className={s.container}>
          <div className={s.heading}>
            <h2 className={s.label}>Cancel offer #{params.id}</h2>
          </div>
          <CancelInfo cancelId={params.id} />
          <CancelOffer cancelId={params.id} />
        </div>
      </HeaderLayout>
    </TabsLayout>
  );
};

export default CancelOfferPage;

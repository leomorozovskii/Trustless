'use client';

import cn from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';

import { AcceptedOffer } from '@berezka-dao/features/acceptOffer/components/AcceptedOffer';
import { AcceptOffer } from '@berezka-dao/features/acceptOffer/components/AcceptOffer';
import { AcceptOfferButtons } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/components/AcceptOfferButtons';
import { OfferAcceptProvider, useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { ClearCross } from '@berezka-dao/shared/icons';

import s from './AcceptOffer.module.scss';

const AcceptOfferPageContent = ({ params }: { params: { id: string } }) => {
  const { activeAcceptStep } = useOfferAcceptContext();

  const labelText = useMemo(() => {
    if (activeAcceptStep === OfferProgress.Created) return 'Offer has been successfully accepted!';
    return `Offer ID #${params.id}`;
  }, [activeAcceptStep, params.id]);

  return (
    <TabsLayout>
      <HeaderLayout>
        <div className={s.container}>
          <div className={cn(s.heading, { [s.headingAccepted]: activeAcceptStep === OfferProgress.Created })}>
            <h2 className={s.label}>{labelText}</h2>
            {activeAcceptStep === OfferProgress.Created && (
              <Link href="/">
                <ClearCross className={s.cross} />
              </Link>
            )}
          </div>
          {activeAcceptStep === OfferProgress.Created ? (
            <AcceptedOffer />
          ) : (
            <>
              <AcceptOffer />
              <AcceptOfferButtons />
            </>
          )}
        </div>
      </HeaderLayout>
    </TabsLayout>
  );
};

const AcceptOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <OfferAcceptProvider id={params.id}>
      <AcceptOfferPageContent params={params} />
    </OfferAcceptProvider>
  );
};

export default AcceptOfferPage;

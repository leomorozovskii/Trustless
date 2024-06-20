'use client';

import cn from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';

import { AcceptOffer, OfferAcceptProvider, useOfferAcceptContext } from '@berezka-dao/features/acceptOffer';
import { AcceptedOffer, AcceptOfferButtons } from '@berezka-dao/features/acceptOffer/components';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';
import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';
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

'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { ClearCross } from '@assets/icons';
import { AcceptOffer } from '@components/AcceptOffer';
import { AcceptedOffer } from '@components/AcceptedOffer';
import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import AcceptOfferButtons from '@components/AcceptOffer/components/AcceptOfferButtons';
import { OfferAcceptProvider, useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';

import s from './AcceptOffer.module.scss';

const AcceptOfferPageContent = ({ params }: { params: { id: string } }) => {
  const { activeAcceptStep, setAcceptId } = useOfferAcceptContext();

  const labelText = useMemo(() => {
    if (activeAcceptStep === OfferProgress.Created) return 'Offer has been successfully accepted!';
    return `Offer ID #${params.id}`;
  }, [activeAcceptStep]);

  useEffect(() => {
    if (params.id) {
      setAcceptId(params.id);
    }
  }, [params]);

  return (
    <Sidebar>
      <Header />
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
    </Sidebar>
  );
};

const AcceptOfferPage = ({ params }: { params: { id: string } }) => {
  return (
    <OfferAcceptProvider>
      <AcceptOfferPageContent params={params} />
    </OfferAcceptProvider>
  );
};

export default AcceptOfferPage;

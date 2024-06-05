'use client';

import { useEffect, useMemo } from 'react';
import cn from 'classnames';

import { ClearCross } from '@assets/icons';
import { AcceptOffer } from '@components/AcceptOffer';
import { AcceptedOffer } from '@components/AcceptedOffer';
import AcceptOfferButtons from '@components/AcceptOffer/components/AcceptOfferButtons';
import { OfferProgress } from '@lib/constants';

import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import Link from 'next/link';
import s from './AcceptOffer.module.scss';

const Page = ({ params }: { params: { id: string } }) => {
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
    <div className={s.container}>
      <div className={cn(s.heading, { [s.headingAccepted]: activeAcceptStep === OfferProgress.Created })}>
        <h2 className={s.label}>{labelText}</h2>
        {activeAcceptStep === OfferProgress.Created && (
          <Link href="/offers">
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
  );
};

export default Page;

'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

import { ClearCross } from '@assets/icons';
import { AcceptOffer } from '@components/AcceptOffer';
import { AcceptedOffer } from '@components/AcceptedOffer';
import AcceptOfferButtons from '@components/AcceptOffer/components/AcceptOfferButtons';
import { OfferProgress } from '@lib/constants';

import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import s from './AcceptOffer.module.scss';

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { activeAcceptStep, setAcceptId } = useOfferAcceptContext();

  const labelText = useMemo(() => {
    if (activeAcceptStep === OfferProgress.Created) return 'Offer has been successfully accepted!';
    return `Offer ID #${params.id}`;
  }, [activeAcceptStep]);

  const handleClose = () => {
    router.push('/offers');
  };

  useEffect(() => {
    if (params.id) {
      setAcceptId(params.id);
    }
  }, [params]);

  return (
    <div className={s.container}>
      <div className={cn(s.heading, { [s.headingAccepted]: activeAcceptStep === OfferProgress.Created })}>
        <h2 className={s.label}>{labelText}</h2>
        {activeAcceptStep === OfferProgress.Created && <ClearCross onClick={handleClose} className={s.cross} />}
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

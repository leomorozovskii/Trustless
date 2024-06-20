import cn from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import { useMemo } from 'react';

import { AcceptOffer, useOfferAcceptContext } from '@berezka-dao/features/acceptOffer';
import { AcceptedOffer, AcceptOfferButtons } from '@berezka-dao/features/acceptOffer/components';
import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';
import { ClearCross } from '@berezka-dao/shared/icons';

import s from './AcceptOfferTemplate.module.scss';

type Props = {
  id: string;
};

const AcceptOfferTemplate: FC<Props> = ({ id }) => {
  const { activeAcceptStep } = useOfferAcceptContext();

  const labelText = useMemo(() => {
    if (activeAcceptStep === OfferProgress.Created) return 'Offer has been successfully accepted!';
    return `Offer ID #${id}`;
  }, [activeAcceptStep, id]);

  return (
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
  );
};

export { AcceptOfferTemplate };

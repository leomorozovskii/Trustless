import cn from 'classnames';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CreateOfferFrom,
  CreateOfferTo,
  useOfferCreateContext,
  IncludeFee,
  OfferButtons,
  ParamsData,
  ProgressOfferBar,
  useGetUserTokens,
} from '@berezka-dao/features/createOffer';
import { ShareOfferContainer } from '@berezka-dao/features/shareOffer';
import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';

import s from './CreateOfferTemplate.module.scss';

const CreateOfferTemplate = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { offerId, activeOfferStep, activeStep, setActiveOfferStep } = useOfferCreateContext();
  useGetUserTokens();

  return (
    <div className={cn(s.container, { [s.created]: activeStep === OfferProgress.Created })}>
      <h2 className={s.title}>{activeStep === OfferProgress.Created ? t('offer.created') : t('offer.create.offer')}</h2>
      <ProgressOfferBar currentStep={activeOfferStep} steps={steps} />
      {activeStep === OfferProgress.Created && offerId ? (
        <ShareOfferContainer offerId={offerId} setActiveOfferStep={setActiveOfferStep} />
      ) : (
        <div className={s.column}>
          <div className={s.row}>
            <div className={s.fromWrapper}>
              <CreateOfferFrom />
            </div>
            <CreateOfferTo />
            <Suspense>
              <ParamsData />
            </Suspense>
          </div>
          <IncludeFee />
          <OfferButtons />
        </div>
      )}
    </div>
  );
};

export { CreateOfferTemplate };

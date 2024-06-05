'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressOfferBar } from 'components/ProgressOfferBar';
import { ShareOfferContainer } from '@components/ShareOfferContainer';
import { OfferFrom } from '@components/CreateOffer/From';
import { OfferTo } from '@components/CreateOffer/To';
import { OfferButtons } from 'components/CreateOffer/Buttons';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';

import s from './CreateOffer.module.scss';

const CreateOfferPage: React.FC = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { offerId, activeOfferStep, activeStep } = useOfferCreateContext();

  return (
    <div className={s.container}>
      <h2 className={s.title}>{activeStep === OfferProgress.Created ? t('offer.created') : t('offer.create.offer')}</h2>
      <ProgressOfferBar currentStep={activeOfferStep} steps={steps} />
      {activeStep === OfferProgress.Created && offerId ? (
        <ShareOfferContainer offerId={offerId} />
      ) : (
        <div className={s.column}>
          <div className={s.row}>
            <div className={s.fromWrapper}>
              <OfferFrom />
            </div>
            <OfferTo />
          </div>
          <OfferButtons />
        </div>
      )}
    </div>
  );
};

export default CreateOfferPage;

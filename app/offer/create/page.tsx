'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressOfferBar } from 'components/ProgressOfferBar';
import { ShareOfferContainer } from '@components/ShareOfferContainer';
import { OfferFrom } from '@components/CreateOffer/From';
import { OfferTo } from '@components/CreateOffer/To';
import { OfferBottom } from '@components/CreateOffer/Bottom';
import { useOfferContext } from '@context/offer/OfferContext';
import { CreateOfferState } from '@lib/constants';

import s from './CreateOffer.module.scss';

const CreateOfferPage: React.FC = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { offerId, activeOfferStep, activeStep } = useOfferContext();

  return (
    <div className={s.container}>
      <h2 className={s.title}>
        {activeStep === CreateOfferState.Created ? t('offer.created') : t('offer.create.offer')}
      </h2>
      <ProgressOfferBar currentStep={activeOfferStep} steps={steps} />
      {activeStep === CreateOfferState.Created && offerId ? (
        <ShareOfferContainer />
      ) : (
        <div className={s.column}>
          <div className={s.row}>
            <div className={s.fromWrapper}>
              <OfferFrom />
            </div>
            <OfferTo />
          </div>
          <OfferBottom />
        </div>
      )}
    </div>
  );
};

export default CreateOfferPage;

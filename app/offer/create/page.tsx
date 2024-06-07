'use client';

import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressOfferBar } from 'components/ProgressOfferBar';
import { ShareOfferContainer } from '@components/ShareOfferContainer';
import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';
import { IncludeFee } from '@components/IncludeFee';
import { OfferFrom } from '@components/CreateOffer/From';
import { OfferTo } from '@components/CreateOffer/To';
import { OfferButtons } from 'components/CreateOffer/Buttons';
import { useGetUserTokens } from '@components/SelectTokenPopup/hooks/useGetUserTokens';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';

import s from './CreateOffer.module.scss';

const CreateOfferPage: React.FC = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { offerId, activeOfferStep, activeStep } = useOfferCreateContext();
  useGetUserTokens();

  return (
    <Sidebar>
      <Header />
      <div className={s.container}>
        <h2 className={s.title}>
          {activeStep === OfferProgress.Created ? t('offer.created') : t('offer.create.offer')}
        </h2>
        <ProgressOfferBar currentStep={activeOfferStep} steps={steps} />
        {activeStep === OfferProgress.Created && offerId ? (
          <ShareOfferContainer offerId={offerId} />
        ) : (
          <div className={s.column}>
            <div className={s.row}>
              <div className={s.fromWrapper}>
                <OfferFrom />
              </div>
              <Suspense>
                <OfferTo />
              </Suspense>
            </div>
            <IncludeFee />
            <OfferButtons />
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default CreateOfferPage;

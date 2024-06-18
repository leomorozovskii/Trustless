'use client';

import { OfferFrom } from '@components/CreateOffer/From';
import { ParamsData } from '@components/CreateOffer/ParamsData';
import { OfferTo } from '@components/CreateOffer/To';
import { Header } from '@components/Header';
import { IncludeFee } from '@components/IncludeFee';
import { useGetUserTokens } from '@components/SelectTokenPopup/hooks/useGetUserTokens';
import { ShareOfferContainer } from '@components/ShareOfferContainer';
import { Sidebar } from '@components/Sidebar';
import { OfferCreateProvider, useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';
import cn from 'classnames';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { OfferButtons } from '@root/outdated/components/CreateOffer/Buttons';
import { ProgressOfferBar } from '@root/outdated/components/ProgressOfferBar';

import s from './CreateOffer.module.scss';

const CreateOfferPageContent: React.FC = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { offerId, activeOfferStep, activeStep, setActiveOfferStep } = useOfferCreateContext();
  useGetUserTokens();

  return (
    <Sidebar>
      <Header />
      <div className={cn(s.container, { [s.created]: activeStep === OfferProgress.Created })}>
        <h2 className={s.title}>
          {activeStep === OfferProgress.Created ? t('offer.created') : t('offer.create.offer')}
        </h2>
        <ProgressOfferBar currentStep={activeOfferStep} steps={steps} />
        {activeStep === OfferProgress.Created && offerId ? (
          <ShareOfferContainer offerId={offerId} setActiveOfferStep={setActiveOfferStep} />
        ) : (
          <div className={s.column}>
            <div className={s.row}>
              <div className={s.fromWrapper}>
                <OfferFrom />
              </div>
              <OfferTo />
              <Suspense>
                <ParamsData />
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

const CreateOfferPage: React.FC = () => (
  <OfferCreateProvider>
    <CreateOfferPageContent />
  </OfferCreateProvider>
);

export default CreateOfferPage;

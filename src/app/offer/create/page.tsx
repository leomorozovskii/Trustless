'use client';

import cn from 'classnames';
import type { FC } from 'react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { OfferButtons } from '@berezka-dao/features/createOffer/components/Buttons';
import { OfferFrom } from '@berezka-dao/features/createOffer/components/From';
import { IncludeFee } from '@berezka-dao/features/createOffer/components/IncludeFee';
import { ParamsData } from '@berezka-dao/features/createOffer/components/ParamsData';
import { ProgressOfferBar } from '@berezka-dao/features/createOffer/components/ProgressOfferBar';
import { useGetUserTokens } from '@berezka-dao/features/createOffer/components/SelectTokenPopup/hooks/useGetUserTokens';
import { OfferTo } from '@berezka-dao/features/createOffer/components/To';
import { OfferCreateProvider, useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { ShareOfferContainer } from '@berezka-dao/features/shareOffer/components/ShareOfferContainer';
import { HeaderLayout } from '@berezka-dao/layouts/HeaderLayout';
import { TabsLayout } from '@berezka-dao/layouts/TabsLayout';

import s from './CreateOffer.module.scss';

const CreateOfferPageContent: FC = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { offerId, activeOfferStep, activeStep, setActiveOfferStep } = useOfferCreateContext();
  useGetUserTokens();

  return (
    <TabsLayout>
      <HeaderLayout>
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
      </HeaderLayout>
    </TabsLayout>
  );
};

const CreateOfferPage: FC = () => (
  <OfferCreateProvider>
    <CreateOfferPageContent />
  </OfferCreateProvider>
);

export default CreateOfferPage;

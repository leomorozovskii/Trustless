'use client';
import React from 'react';
import s from '@styles/pages/CreateOffer.module.scss';
import { useTranslation } from 'react-i18next';
import { ProgressOfferBar } from 'components/ProgressOfferBar';
import { OfferFrom } from '@components/CreateOffer/From';
import { OfferTo } from '@components/CreateOffer/To';
import { OfferBottom } from '@components/CreateOffer/Bottom';
import { useOfferContext } from '@src/context/offer/offer-context';

const CreateOfferPage: React.FC = () => {
  const { t } = useTranslation();
  const steps = ['Approve', 'Create Trade', 'Publish & Share'];
  const { activeOfferStep } = useOfferContext();

  // TODO paste a real offer number
  return (
    <div className={s.container}>
      <h2 className={s.title}>{`${t('offer.create.offer')} #355157`}</h2>
      <ProgressOfferBar currentStep={activeOfferStep} steps={steps} />
      <div className={s.column}>
        <div className={s.row}>
          <div className={s.fromWrapper}>
            <OfferFrom />
          </div>
          <OfferTo />
        </div>
        <OfferBottom />
      </div>
    </div>
  );
};

export default CreateOfferPage;

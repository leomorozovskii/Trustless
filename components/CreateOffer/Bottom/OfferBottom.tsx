import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { GasIcon, SelectIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { ProgressBar } from '@components/ProgressBar';
import { useButtonsDisabled } from '@components/CreateOffer/Bottom/hooks/useButtonsDisabled';
import { CreateOfferState } from '@lib/constants';
import { useOfferContext } from '@/context/offer/offer-context';

import s from './OfferBottom.module.scss';

const OfferBottom = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep, setActiveOfferStep } = useOfferContext();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();

  useEffect(() => {
    if (!approveButtonDisabled) {
      setActiveStep(CreateOfferState.Filled);
    } else {
      setActiveStep(CreateOfferState.None);
    }
  }, [approveButtonDisabled]);

  const approveHandler = () => {
    //  approve handler
    setActiveStep(CreateOfferState.Approved);
    setActiveOfferStep(2);
  };

  const createHandler = () => {
    //  create handler
    setActiveStep(CreateOfferState.Created);
    setActiveOfferStep(3);
  };

  return (
    <div className={s.container}>
      <p className={s.label}>{t('offer.create.signText')}</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeStep !== CreateOfferState.Approved && activeStep !== CreateOfferState.Created && (
            <Button disabled={approveButtonDisabled} type="button" onClick={approveHandler}>
              {t('token.approve')}
            </Button>
          )}
          <Button disabled={createButtonDisabled} type="button" onClick={createHandler}>
            {t('token.create')}
          </Button>
        </div>
        <ProgressBar currentStep={activeStep} />
      </div>
      {activeStep !== CreateOfferState.None && (
        <div className={s.serviceContainer}>
          <p className={s.feeLabel}>{`${t('offer.create.fee')} 0.01%`}</p>
          <div className={s.feeContainer}>
            <GasIcon />
            {/* TODO: calculate a real number */}
            <p className={s.feeLabel}>11.43%</p>
            <SelectIcon />
          </div>
        </div>
      )}
      <p className={s.terms}>
        {t('offer.create.acceptTerms')} <span className={s.conditions}>{t('offer.create.termsConditions')}</span>
      </p>
    </div>
  );
};

export default OfferBottom;

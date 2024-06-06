import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { GasIcon, SelectIcon } from '@assets/icons';
import { ProgressBar } from '@components/ProgressBar';
import { TxButton } from '@components/TxFlow';
import { useButtonsDisabled } from '@components/CreateOffer/Buttons/hooks/useButtonsDisabled';
import { useApprove } from '@components/CreateOffer/Buttons/hooks/useApprove';
import { useCreateTrade } from '@components/CreateOffer/Buttons/hooks/useCreateTrade';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';

import s from './OfferButtons.module.scss';

const OfferButtons = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep } = useOfferCreateContext();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();

  const { onCreateApproveReceipt, createApproveHandler } = useApprove();
  const { onCreateReceipt, createTrade } = useCreateTrade();

  useEffect(() => {
    if (!approveButtonDisabled) {
      setActiveStep(OfferProgress.Filled);
    } else {
      setActiveStep(OfferProgress.None);
    }
  }, [approveButtonDisabled]);

  return (
    <div className={s.container}>
      <p className={s.label}>{t('offer.create.signText')}</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeStep !== OfferProgress.Approved && activeStep !== OfferProgress.Created && (
            <TxButton
              type="button"
              onReceipt={onCreateApproveReceipt}
              disabled={approveButtonDisabled}
              errorTitle={t('error.approve')}
              writeContract={createApproveHandler}
            >
              {({ isLoading }) => (isLoading ? t('token.approving') : t('token.approve'))}
            </TxButton>
          )}
          <TxButton
            type="button"
            onReceipt={onCreateReceipt}
            disabled={createButtonDisabled}
            errorTitle={t('error.offer')}
            writeContract={createTrade}
          >
            {({ isLoading }) => (isLoading ? t('token.creating') : t('token.create'))}
          </TxButton>
        </div>
        <ProgressBar currentStep={activeStep} />
      </div>
      {activeStep !== OfferProgress.None && (
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

export default OfferButtons;

import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { GasIcon } from '@assets/icons';
import { ProgressBar } from '@components/ProgressBar';
import { TxButton } from '@components/TxFlow';
import { useButtonsDisabled } from '@components/CreateOffer/Buttons/hooks/useButtonsDisabled';
import { useGetMinFee } from '@components/CreateOffer/Buttons/hooks/useGetMinFee';
import { useCreateTrade } from '@components/CreateOffer/Buttons/hooks/useCreateTrade';
import { useCreateApprove } from '@components/CreateOffer/Buttons/hooks/useCreateApprove';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';

import s from './OfferButtons.module.scss';

const OfferButtons = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep } = useOfferCreateContext();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();

  const { onCreateApproveReceipt, createApproveHandler, memoizedApproveRequest } = useCreateApprove();
  const { onCreateReceipt, createTrade, memoizedTradeRequest } = useCreateTrade();
  const { minFee: minApproveFee } = useGetMinFee({
    data: memoizedApproveRequest,
    active: activeStep === OfferProgress.Filled,
  });

  const { minFee: minCreateFee } = useGetMinFee({
    data: memoizedTradeRequest,
    active: activeStep === OfferProgress.Approved,
  });

  const memoizedFee = useMemo(() => {
    if (activeStep === OfferProgress.None || activeStep === OfferProgress.Created) return;
    if (activeStep === OfferProgress.Filled) return minApproveFee;
    return minCreateFee;
  }, [minApproveFee, minCreateFee, activeStep]);

  useEffect(() => {
    if (!approveButtonDisabled) {
      setActiveStep(OfferProgress.Filled);
    } else {
      setActiveStep(OfferProgress.None);
    }
  }, [approveButtonDisabled, setActiveStep]);

  return (
    <div className={s.createContainer}>
      <p className={s.label}>{t('offer.create.signText')}</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeStep !== OfferProgress.Approved && activeStep !== OfferProgress.Created && (
            <TxButton
              size="lg"
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
            size="lg"
            type="button"
            onReceipt={(receipt) => onCreateReceipt(receipt)}
            disabled={createButtonDisabled}
            errorTitle={t('error.offer')}
            writeContract={createTrade}
          >
            {({ isLoading }) => (isLoading ? t('token.creating') : t('token.create'))}
          </TxButton>
        </div>
        <ProgressBar currentStep={activeStep} />
      </div>
      {/* TODO change gas price */}
      {activeStep !== OfferProgress.None && activeStep !== OfferProgress.Created && (
        <div className={s.serviceContainer}>
          <p className={s.feeLabel}>Min gas price</p>
          <div className={s.feeContainer}>
            <GasIcon />
            <p className={s.feeLabel}>~ ${memoizedFee}</p>
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

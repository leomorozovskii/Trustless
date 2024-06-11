import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressBar } from '@components/ProgressBar';
import { TxButton } from '@components/TxFlow';
import { useButtonsDisabled } from '@components/CreateOffer/Buttons/hooks/useButtonsDisabled';
import { useCreateTrade } from '@components/CreateOffer/Buttons/hooks/useCreateTrade';
import { useCreateApprove } from '@components/CreateOffer/Buttons/hooks/useCreateApprove';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';

import { useAccount } from 'wagmi';
import s from './OfferButtons.module.scss';

const OfferButtons = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep, offerFromState } = useOfferCreateContext();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();

  const { address } = useAccount();

  const { onCreateApproveReceipt, createApproveHandler } = useCreateApprove();
  const { onCreateReceipt, createTrade } = useCreateTrade();

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
          {activeStep !== OfferProgress.Approved &&
            offerFromState.approvedAddress !== address &&
            activeStep !== OfferProgress.Created && (
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
      {/* {activeStep !== OfferProgress.None && ( */}
      {/*   <div className={s.serviceContainer}> */}
      {/*     <p className={s.feeLabel}>Gas fee</p> */}
      {/*     <div className={s.feeContainer}> */}
      {/*       <GasIcon /> */}
      {/*       /!* TODO: calculate a real number *!/ */}
      {/*       <p className={s.feeLabel}>11.43%</p> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* )} */}
      <p className={s.terms}>
        {t('offer.create.acceptTerms')} <span className={s.conditions}>{t('offer.create.termsConditions')}</span>
      </p>
    </div>
  );
};

export default OfferButtons;

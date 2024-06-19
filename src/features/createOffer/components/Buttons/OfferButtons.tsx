import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressBar } from '@berezka-dao/features/createOffer/components/ProgressBar';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { GasPrice } from '@berezka-dao/shared/components/GasPrice';
import { TxButton } from '@berezka-dao/shared/components/TxFlow';

import { useButtonsDisabled } from './hooks/useButtonsDisabled';
import { useCreateApprove } from './hooks/useCreateApprove';
import { useCreateTrade } from './hooks/useCreateTrade';
import { useGetMinFee } from './hooks/useGetMinFee';
import s from './OfferButtons.module.scss';

const OfferButtons = () => {
  const { t } = useTranslation();
  const { activeStep, setActiveStep, setActiveOfferStep } = useOfferCreateContext();
  const { approveButtonDisabled, createButtonDisabled } = useButtonsDisabled();

  const { onCreateApproveReceipt, createApproveHandler, createApproveRequest } = useCreateApprove();
  const { onCreateReceipt, createTrade, createTradeRequest } = useCreateTrade();

  const { minFee: minApproveFee } = useGetMinFee({
    data: createApproveRequest,
    active: activeStep === OfferProgress.Filled,
  });

  const { minFee: minCreateFee } = useGetMinFee({
    data: createTradeRequest,
    active: activeStep === OfferProgress.Approved,
  });

  const memoizedFee = useMemo(() => {
    if (activeStep === OfferProgress.None || activeStep === OfferProgress.Created) return null;
    if (activeStep === OfferProgress.Filled) return minApproveFee;
    return minCreateFee;
  }, [minApproveFee, minCreateFee, activeStep]);

  useEffect(() => {
    if (!approveButtonDisabled) {
      setActiveStep(OfferProgress.Filled);
    } else {
      setActiveOfferStep(1);
      setActiveStep(OfferProgress.None);
    }
  }, [approveButtonDisabled, setActiveOfferStep, setActiveStep]);

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
      {activeStep !== OfferProgress.None && activeStep !== OfferProgress.Created && <GasPrice minFee={memoizedFee} />}
      <p className={s.terms}>
        {t('offer.create.acceptTerms')} <span className={s.conditions}>{t('offer.create.termsConditions')}</span>
      </p>
    </div>
  );
};

export { OfferButtons };

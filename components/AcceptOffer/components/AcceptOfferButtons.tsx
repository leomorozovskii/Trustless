'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import { ProgressBar } from '@components/ProgressBar';
import { TxButton } from '@components/TxFlow';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useAcceptApprove } from '@components/AcceptOffer/hooks/useAcceptApprove';
import { useAcceptOffer } from '@components/AcceptOffer/hooks/useAcceptOffer';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { OfferProgress } from '@lib/constants';

import s from '@components/CreateOffer/Buttons/OfferButtons.module.scss';

const AcceptOfferButtons: React.FC = () => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { activeAcceptStep, acceptId } = useOfferAcceptContext();
  const { active, isLoading } = useGetOfferDetails({ id: acceptId });
  const { t } = useTranslation();

  const { onAcceptApproveReceipt, acceptApproveHandler } = useAcceptApprove();
  const { acceptTrade, onAcceptReceipt } = useAcceptOffer();

  useEffect(() => {
    if (!isLoading && !active) {
      handleAddItem({ title: 'Error', text: 'The offer was accepted or closed', type: 'error' });
      router.push('/offer/create');
    }
  }, [active, isLoading]);

  return (
    <div className={s.container}>
      <p className={s.label}>You will have to sign 2 transactions: Approval of token & Accept Trade</p>
      <div className={s.buttonWrapper}>
        <div className={s.buttonContainer}>
          {activeAcceptStep !== OfferProgress.Approved && (
            <TxButton
              type="button"
              onReceipt={onAcceptApproveReceipt}
              disabled={!active}
              errorTitle={t('error.approve')}
              writeContract={acceptApproveHandler}
            >
              {({ isLoading: isButtonLoading }) => (isButtonLoading ? t('token.approving') : t('token.approve'))}
            </TxButton>
          )}
          <TxButton
            type="button"
            disabled={activeAcceptStep !== OfferProgress.Approved || !active}
            errorTitle="Accept error"
            onReceipt={(receipt) => onAcceptReceipt(receipt)}
            writeContract={acceptTrade}
          >
            {({ isLoading: isButtonLoading }) => (isButtonLoading ? t('Accepting Trade') : t('Accept Trade'))}
          </TxButton>
        </div>
        <ProgressBar currentStep={activeAcceptStep} />
      </div>
      {/* TODO change gas price */}
      {/* <div className={s.serviceContainer}> */}
      {/*   <p className={s.feeLabel}>Gas fee</p> */}
      {/*   <div className={s.feeContainer}> */}
      {/*     <GasIcon /> */}
      {/*     /!* TODO: calculate a real number *!/ */}
      {/*     <p className={s.feeLabel}>11.43%</p> */}
      {/*   </div> */}
      {/* </div> */}
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export default AcceptOfferButtons;

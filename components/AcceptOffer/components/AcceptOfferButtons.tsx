'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import { GasIcon } from '@assets/icons';
import { Checkbox } from '@components/Checkbox';
import { ProgressBar } from '@components/ProgressBar';
import { TxButton } from '@components/TxFlow';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useAcceptApprove } from '@components/AcceptOffer/hooks/useAcceptApprove';
import { useAcceptOffer } from '@components/AcceptOffer/hooks/useAcceptOffer';
import { useGetMinFee } from '@components/CreateOffer/Buttons/hooks/useGetMinFee';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { OfferProgress } from '@lib/constants';

import s from '@components/CreateOffer/Buttons/OfferButtons.module.scss';

const AcceptOfferButtons: React.FC = () => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { activeAcceptStep, acceptId, setIsInfinite } = useOfferAcceptContext();
  const { active, isLoading } = useGetOfferDetails({ id: acceptId });
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { onAcceptApproveReceipt, acceptApproveHandler, memoizedApproveRequest } = useAcceptApprove();
  const { acceptTrade, onAcceptReceipt, memoizedAcceptTrade } = useAcceptOffer();

  const { minFee: minApproveFee } = useGetMinFee({
    data: memoizedApproveRequest,
    active: activeAcceptStep === OfferProgress.Filled,
  });

  const { minFee: minAcceptFee } = useGetMinFee({
    data: memoizedAcceptTrade,
    active: activeAcceptStep === OfferProgress.Approved,
  });

  const memoizedFee = useMemo(() => {
    if (activeAcceptStep === OfferProgress.None || activeAcceptStep === OfferProgress.Created) return;
    if (activeAcceptStep === OfferProgress.Filled) return minApproveFee;
    return minAcceptFee;
  }, [activeAcceptStep, minApproveFee, minAcceptFee]);

  useEffect(() => {
    if (!isLoading && !active && isMounted) {
      handleAddItem({ title: 'Error', text: 'The offer was accepted or closed', type: 'error' });
      router.push('/offer/create');
    }
  }, [active, handleAddItem, isLoading, isMounted, router]);

  useEffect(() => {
    if (!isLoading) {
      setIsMounted(true);
    }
  }, [isLoading]);

  return (
    <div className={s.container}>
      <Checkbox
        label="Infinite approve"
        onCheckedChange={(checked) => {
          setIsInfinite(checked);
        }}
      />
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
      <div className={s.serviceContainer}>
        <p className={s.feeLabel}>Min gas price</p>
        <div className={s.feeContainer}>
          <GasIcon />
          <p className={s.feeLabel}>~ ${memoizedFee}</p>
        </div>
      </div>
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export default AcceptOfferButtons;

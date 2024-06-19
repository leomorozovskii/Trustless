'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAcceptApprove } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useAcceptApprove';
import { useAcceptOffer } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useAcceptOffer';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { useGetMinFee } from '@berezka-dao/features/createOffer/components/Buttons/hooks/useGetMinFee';
import s from '@berezka-dao/features/createOffer/components/Buttons/OfferButtons.module.scss';
import { ProgressBar } from '@berezka-dao/features/createOffer/components/ProgressBar';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { GasPrice } from '@berezka-dao/shared/components/GasPrice';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { TxButton } from '@berezka-dao/shared/components/TxFlow';
import { Checkbox } from '@berezka-dao/shared/ui-kit/Checkbox';
import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

const AcceptOfferButtons: FC = () => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { activeAcceptStep, acceptId, setIsInfinite } = useOfferAcceptContext();
  const { active, isLoading } = useGetOfferDetails({ id: acceptId });
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { onAcceptApproveReceipt, acceptApproveHandler, acceptApproveRequest } = useAcceptApprove();
  const { acceptTrade, onAcceptReceipt, acceptTradeRequest } = useAcceptOffer();

  const { minFee: minApproveFee } = useGetMinFee({
    data: acceptApproveRequest,
    active: activeAcceptStep === OfferProgress.Filled && isMounted,
  });

  const { minFee: minAcceptFee } = useGetMinFee({
    data: acceptTradeRequest,
    active: activeAcceptStep === OfferProgress.Approved && isMounted,
  });

  const memoizedFee = useMemo(() => {
    if (activeAcceptStep === OfferProgress.None || activeAcceptStep === OfferProgress.Created) return null;
    if (activeAcceptStep === OfferProgress.Filled) return minApproveFee;
    return minAcceptFee;
  }, [activeAcceptStep, minApproveFee, minAcceptFee]);

  useEffect(() => {
    if (!isLoading && !active && isMounted) {
      handleAddItem({ title: t('error.message'), text: t('error.acceptedOrClosed'), type: 'error' });
      router.push('/offer/create');
    }
  }, [active, handleAddItem, isLoading, isMounted, router, t]);

  useEffect(() => {
    if (!isLoading) {
      setIsMounted(true);
    }
  }, [isLoading]);

  return (
    <div className={s.container}>
      <Skeleton loading={!isMounted}>
        {activeAcceptStep === OfferProgress.Filled && (
          <Checkbox
            label={t('offer.infinite')}
            onCheckedChange={(checked) => {
              setIsInfinite(checked);
            }}
          />
        )}
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
              {({ isLoading: isButtonLoading }) => (isButtonLoading ? t('token.accepting') : t('token.accept'))}
            </TxButton>
          </div>
          <ProgressBar currentStep={activeAcceptStep} />
        </div>
        <GasPrice minFee={memoizedFee} />
        <p className={s.terms}>
          {t('offer.create.acceptTerms')} <span className={s.conditions}>{t('offer.create.termsConditions')}</span>
        </p>
      </Skeleton>
    </div>
  );
};

export { AcceptOfferButtons };

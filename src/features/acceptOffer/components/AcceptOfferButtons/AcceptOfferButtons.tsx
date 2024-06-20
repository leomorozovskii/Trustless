'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAcceptApprove, useAcceptOffer } from '@berezka-dao/features/acceptOffer/hooks';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import s from '@berezka-dao/features/createOffer/components/OfferButtons/OfferButtons.module.scss';
import { GasPrice } from '@berezka-dao/shared/components/GasPrice';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { ProgressBar, OfferProgress } from '@berezka-dao/shared/components/ProgressBar';
import { TxButton } from '@berezka-dao/shared/components/TxFlow';
import { useGetMinFee } from '@berezka-dao/shared/hooks/useGetMinFee';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';
import { Checkbox } from '@berezka-dao/shared/ui-kit/Checkbox';
import { Skeleton } from '@berezka-dao/shared/ui-kit/Skeleton';

const AcceptOfferButtons: FC = () => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { activeAcceptStep, acceptId, setIsInfinite } = useOfferAcceptContext();
  const { active, isLoading } = useGetOfferDetails({ id: acceptId });
  const { t } = useTranslation();

  const { onAcceptApproveReceipt, acceptApproveHandler, acceptApproveRequest } = useAcceptApprove();
  const { acceptTrade, onAcceptReceipt, acceptTradeRequest } = useAcceptOffer();

  const { minFee: minApproveFee } = useGetMinFee({
    data: acceptApproveRequest,
    active: activeAcceptStep === OfferProgress.Filled,
  });

  const { minFee: minAcceptFee } = useGetMinFee({
    data: acceptTradeRequest,
    active: activeAcceptStep === OfferProgress.Approved,
  });

  const memoizedFee = useMemo(() => {
    if (activeAcceptStep === OfferProgress.None || activeAcceptStep === OfferProgress.Created) return null;
    if (activeAcceptStep === OfferProgress.Filled) return minApproveFee;
    return minAcceptFee;
  }, [activeAcceptStep, minApproveFee, minAcceptFee]);

  useEffect(() => {
    if (!isLoading && !active) {
      handleAddItem({ title: t('error.message'), text: t('error.acceptedOrClosed'), type: 'error' });
      router.push('/offer/create');
    }
  }, [active, handleAddItem, isLoading, router, t]);

  return (
    <div className={s.container}>
      <Skeleton loading={isLoading}>
        {activeAcceptStep === OfferProgress.Filled && (
          <Checkbox
            label={t('offer.infinite')}
            onCheckedChange={(checked) => {
              setIsInfinite(checked);
            }}
          />
        )}
        <p className={s.label}>{t('offer.accept.youWillHaveTo')}</p>
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

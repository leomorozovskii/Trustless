'use client';

import { useWriteCancelTrade } from '@components/Offers/hooks/useWriteCloseOffer';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { UseOffersDetailsQueryKey } from '@components/Offers/hooks/useOffersDetailsQuery';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { TxButton } from '@components/TxFlow';
import s from './OffersCancelOffer.module.scss';

type OffersCancelOfferProps = {
  offerId: string | null;
  onCancelOffer?: () => void;
};

const OffersCancelOffer: React.FC<OffersCancelOfferProps> = ({ offerId, onCancelOffer }) => {
  const { t } = useTranslation();
  const cancelOffer = useWriteCancelTrade();
  const queryClient = useQueryClient();
  const { handleAddItem } = useToastifyContext();
  const handleWriteCancelOffer = async () => {
    if (!offerId) return;
    return cancelOffer.writeContractAsync(offerId);
  };
  const handleCancelOfferReceipt = () => {
    queryClient.invalidateQueries({
      queryKey: [UseOffersDetailsQueryKey],
    });
    handleAddItem({ title: t('success.message'), text: t('success.offerCancelled'), type: 'success' });
    onCancelOffer?.();
  };
  return (
    <TxButton
      type="button"
      className={s.container}
      writeContract={handleWriteCancelOffer}
      onReceipt={handleCancelOfferReceipt}
      disabled={!offerId}
      errorTitle={t('error.cancel')}
    >
      {({ isLoading }) => (isLoading ? t('offers.cancellingOffer') : t('offers.cancelOffer'))}
    </TxButton>
  );
};

export { OffersCancelOffer };

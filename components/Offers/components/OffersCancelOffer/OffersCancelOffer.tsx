'use client';

import { Button } from '@components/Button';
import { useWriteCancelTrade } from '@components/Offers/hooks/useWriteCloseOffer';
import { waitForTransactionReceipt } from 'wagmi/actions';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { UseOffersDetailsQueryKey } from '@components/Offers/hooks/useOffersDetailsQuery';
import { useConfig } from 'wagmi';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import s from './OffersCancelOffer.module.scss';

type OffersCancelOfferProps = {
  offerId: string | null;
  onCancelOffer?: () => void;
};

const OffersCancelOffer: React.FC<OffersCancelOfferProps> = ({ offerId, onCancelOffer }) => {
  const wagmiConfig = useConfig();
  const { t } = useTranslation();
  const cancelOffer = useWriteCancelTrade();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleAddItem } = useToastifyContext();
  const handleCancelOffer = async () => {
    if (!offerId) return;
    setIsLoading(true);
    try {
      const hash = await cancelOffer.writeContractAsync(offerId);
      await waitForTransactionReceipt(wagmiConfig, { hash });
      onCancelOffer?.();
      handleAddItem({ title: t('success.message'), text: t('success.offerCancelled'), type: 'success' });
      queryClient.invalidateQueries({
        queryKey: [UseOffersDetailsQueryKey],
      });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes('User denied transaction')) {
          handleAddItem({ title: t('error.cancel'), text: t('error.denied'), type: 'error' });
        } else if (e.message.includes('insufficient funds')) {
          handleAddItem({ title: t('error.cancel'), text: t('error.insufficientFunds'), type: 'error' });
        } else {
          handleAddItem({ title: t('error.cancel'), text: t('error.somethingWrong'), type: 'error' });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button type="button" className={s.container} onClick={handleCancelOffer} loading={isLoading} disabled={!offerId}>
      {isLoading ? t('offers.cancellingOffer') : t('offers.cancelOffer')}
    </Button>
  );
};

export { OffersCancelOffer };

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionReceipt } from 'viem';
import { useAccount } from 'wagmi';

import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferContext } from '@context/offer/OfferContext';
import { isDenied } from '@components/CreateOffer/Bottom/utils/utils';
import { CreateOfferState } from '@lib/constants';

interface IOfferErrors {
  approveError: any;
  approveReceipt: TransactionReceipt | undefined;
  tradeError: any;
  tradeReceipt: TransactionReceipt | undefined;
}

export const useOfferErrors = ({ approveError, approveReceipt, tradeError, tradeReceipt }: IOfferErrors) => {
  const { t } = useTranslation();
  const { setActiveStep, setActiveOfferStep } = useOfferContext();
  const { address: userAddress } = useAccount();
  const { handleAddItem } = useToastifyContext();

  useEffect(() => {
    if (approveError && !userAddress) {
      handleAddItem({ title: t('error.message'), text: t('error.walletNotConnected'), type: 'error' });
    } else if (approveError && isDenied(approveError.cause.toString())) {
      handleAddItem({ title: t('error.approve'), text: t('error.denied'), type: 'error' });
    } else if (approveError) {
      handleAddItem({ title: t('error.approve'), text: String(approveError.cause), type: 'error' });
    }
  }, [approveError]);

  useEffect(() => {
    if (tradeError && !userAddress) {
      handleAddItem({ title: t('error.message'), text: t('error.walletNotConnected'), type: 'error' });
    } else if (tradeError && isDenied(tradeError.cause.toString())) {
      handleAddItem({ title: t('error.offer'), text: t('error.denied'), type: 'error' });
    } else if (tradeError) {
      handleAddItem({ title: t('error.offer'), text: String(tradeError.cause), type: 'error' });
    }
  }, [tradeError]);

  useEffect(() => {
    if (approveReceipt) {
      handleAddItem({ title: t('success.message'), text: t('success.approved'), type: 'success' });
      setActiveStep(CreateOfferState.Approved);
      setActiveOfferStep(2);
    }
  }, [approveReceipt]);

  useEffect(() => {
    if (tradeReceipt) {
      handleAddItem({ title: t('success.message'), text: t('success.offerCreated'), type: 'success' });
      setActiveStep(CreateOfferState.Created);
      setActiveOfferStep(3);
    }
  }, [tradeReceipt]);
};

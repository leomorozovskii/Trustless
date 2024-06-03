import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Address, createPublicClient, parseAbiItem, TransactionReceipt } from 'viem';
import { http, useAccount } from 'wagmi';

import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferContext } from '@context/offer/OfferContext';
import { isDenied } from '@components/CreateOffer/Bottom/utils/utils';
import { CreateOfferState } from '@lib/constants';
import { sepolia } from 'wagmi/chains';
import { environment } from '@/environment';

interface IOfferErrors {
  approveError: any;
  approveReceipt: TransactionReceipt | undefined;
  tradeError: any;
  tradeReceipt: TransactionReceipt | undefined;
}

export const useOfferErrors = ({ approveError, approveReceipt, tradeError, tradeReceipt }: IOfferErrors) => {
  const { t } = useTranslation();
  const { setActiveStep, setActiveOfferStep, setInputsDisabled, setOfferId } = useOfferContext();
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
      setInputsDisabled(true);
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

  useEffect(() => {
    if (!tradeReceipt) return;
    const getOfferId = async () => {
      const event = parseAbiItem('event OfferCreated(uint indexed tradeID)');

      const client = createPublicClient({
        chain: sepolia,
        transport: http(environment.apiKey),
      });

      const logs = await client.getLogs({
        event,
        address: environment.contractAddress as Address,
        blockHash: tradeReceipt?.blockHash,
      });

      const logIndex = tradeReceipt?.logs[2].logIndex;

      const result = logs.find((item) => item.logIndex === logIndex);
      if (result && result.args.tradeID) {
        setOfferId(Number(result.args.tradeID));
      }
    };
    getOfferId();
  }, [tradeReceipt]);
};

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPublicClient, parseAbiItem, parseUnits } from 'viem';
import { http, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { checkAddress } from '@components/CreateOffer/Buttons/utils/utils';
import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@/environment';

export const useCreateTrade = () => {
  const { handleAddItem } = useToastifyContext();
  const { t } = useTranslation();
  const { setActiveStep, setActiveOfferStep, setOfferId, offerToState, offerFromState } = useOfferCreateContext();
  const { tokenFromAddress, tokenToAddress, tokenFromDecimals, tokenToDecimals, isValid } = useTokenData();

  const { data: tradeHash, writeContractAsync: tradeContract } = useWriteContract();
  const { data: tradeReceipt } = useWaitForTransactionReceipt({ hash: tradeHash });

  const onCreateReceipt = () => {
    handleAddItem({ title: t('success.message'), text: t('success.offerCreated'), type: 'success' });
    setActiveStep(OfferProgress.Created);
    setActiveOfferStep(3);
  };

  const createTrade = async () => {
    if (!isValid) return;
    return tradeContract({
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'initiateTrade',
      args: [
        tokenFromAddress,
        tokenToAddress,
        parseUnits(String(offerFromState.amount), tokenFromDecimals),
        parseUnits(String(offerToState.amount), tokenToDecimals),
        checkAddress(offerToState.receiver),
      ],
    });
  };

  useEffect(() => {
    const getOfferId = async () => {
      const event = parseAbiItem('event OfferCreated(uint indexed tradeID)');

      const client = createPublicClient({
        chain: sepolia,
        transport: http(environment.apiKey),
      });

      const logs = await client.getLogs({
        event,
        address: environment.contractAddress,
        blockHash: tradeReceipt?.blockHash,
      });

      const logIndex = tradeReceipt?.logs[2]?.logIndex;
      const result = logs.find((item) => item.logIndex === logIndex);

      if (result && result.args.tradeID) {
        setOfferId(Number(result.args.tradeID));
      }
    };
    getOfferId();
  }, [tradeReceipt]);

  return {
    onCreateReceipt,
    createTrade,
  };
};

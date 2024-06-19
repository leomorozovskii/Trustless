import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createPublicClient, parseAbiItem, parseUnits, TransactionReceipt } from 'viem';
import { http, useAccount, useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { checkAddress } from '@components/CreateOffer/Buttons/utils/utils';
import { useTokenData } from '@components/CreateOffer/Buttons/hooks/useTokenData';
import { useGetBalanceGreater } from '@components/CreateOffer/Buttons/hooks/useGetBalanceGreater';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';
import { network } from '@lib/wagmiConfig';

export const useCreateTrade = () => {
  const { handleAddItem } = useToastifyContext();
  const { t } = useTranslation();
  const { setActiveStep, setActiveOfferStep, setOfferId, offerToState, offerFromState } = useOfferCreateContext();
  const { tokenFromAddress, tokenToAddress, tokenFromDecimals, tokenToDecimals, isValid } = useTokenData();
  const { address } = useAccount();

  const { writeContractAsync: tradeContract } = useWriteContract();
  const { isGreater: isCreateGreater } = useGetBalanceGreater({
    tokenAddress: tokenFromAddress,
    tokenAmount: offerFromState.amount,
  });

  const onCreateReceipt = (receipt: TransactionReceipt) => {
    handleAddItem({ title: t('success.message'), text: t('success.offerCreated'), type: 'success' });
    setActiveStep(OfferProgress.Created);
    setActiveOfferStep(3);

    const getOfferId = async () => {
      const event = parseAbiItem('event OfferCreated(uint indexed tradeID)');

      const client = createPublicClient({
        chain: network,
        transport: http(environment.apiUrl),
      });

      const logs = await client.getLogs({
        event,
        address: environment.contractAddress,
        blockHash: receipt?.blockHash,
      });

      const logIndex = receipt?.logs[receipt?.logs.length - 1]?.logIndex;
      const result = logs.find((item) => item.logIndex === logIndex);

      if (result && result.args.tradeID) {
        setOfferId(Number(result.args.tradeID));
      }
    };
    getOfferId();
  };

  const createTradeRequest = useMemo(() => {
    if (!tokenFromAddress || !tokenToAddress || !offerFromState.amount || !offerToState.amount || !address) return;

    if (isCreateGreater()) return;

    let offerFromAmount;
    try {
      offerFromAmount = parseUnits(String(offerFromState.amount), tokenFromDecimals);
    } catch (e) {
      offerFromAmount = BigInt(0);
    }

    let offerToAmount;
    try {
      offerToAmount = parseUnits(String(offerToState.amount), tokenToDecimals);
    } catch (e) {
      offerToAmount = BigInt(0);
    }

    return {
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'initiateTrade',
      args: [tokenFromAddress, tokenToAddress, offerFromAmount, offerToAmount, checkAddress(offerToState.receiver)],
      account: address,
    };
  }, [
    address,
    isCreateGreater,
    offerFromState.amount,
    offerToState.amount,
    offerToState.receiver,
    tokenFromAddress,
    tokenFromDecimals,
    tokenToAddress,
    tokenToDecimals,
  ]);

  const createTrade = async () => {
    if (!isValid) return;
    if (isCreateGreater()) {
      throw new Error('Insufficient balance');
    }
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

  return {
    onCreateReceipt,
    createTrade,
    createTradeRequest,
  };
};

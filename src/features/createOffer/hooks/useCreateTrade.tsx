import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TransactionReceipt } from 'viem';
import { createPublicClient, parseAbiItem, parseUnits } from 'viem';
import { http, useAccount, useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@berezka-dao/core/abis/trustlessOtcAbi';
import { network } from '@berezka-dao/core/configs';
import { environment } from '@berezka-dao/core/environment';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';
import { useGetBalanceGreater } from '@berezka-dao/shared/hooks/useGetBalanceGreater';

import { checkAddress } from '../utils';

export const useCreateTrade = () => {
  const { handleAddItem } = useToastifyContext();
  const { t } = useTranslation();
  const { setActiveStep, setActiveOfferStep, setOfferId, offerToState, offerFromState } = useOfferCreateContext();
  const { address } = useAccount();

  const { writeContractAsync: tradeContract } = useWriteContract();
  const { isGreater: isCreateGreater } = useGetBalanceGreater({
    tokenAddress: offerFromState.from,
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
    if (
      !address ||
      !offerFromState.from ||
      !offerToState.to ||
      !offerFromState.amount ||
      !offerToState.amount ||
      !offerFromState.decimals ||
      !offerToState.decimals ||
      isCreateGreater()
    )
      return;

    let offerFromAmount;
    try {
      offerFromAmount = parseUnits(String(offerFromState.amount), offerFromState.decimals);
    } catch (e) {
      offerFromAmount = BigInt(0);
    }

    let offerToAmount;
    try {
      offerToAmount = parseUnits(String(offerToState.amount), offerToState.decimals);
    } catch (e) {
      offerToAmount = BigInt(0);
    }

    return {
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'initiateTrade',
      args: [offerFromState.from, offerToState.to, offerFromAmount, offerToAmount, checkAddress(offerToState.receiver)],
      account: address,
    };
  }, [
    address,
    offerFromState.from,
    offerToState.to,
    offerFromState.amount,
    offerToState.amount,
    offerFromState.decimals,
    offerToState.decimals,
    offerToState.receiver,
    isCreateGreater,
  ]);

  const createTrade = async () => {
    if (!offerFromState.from || !offerToState.to || !offerFromState.decimals || !offerToState.decimals) return;
    if (isCreateGreater()) {
      throw new Error('Insufficient balance');
    }
    return tradeContract({
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'initiateTrade',
      args: [
        offerFromState.from,
        offerToState.to,
        parseUnits(String(offerFromState.amount), offerFromState.decimals),
        parseUnits(String(offerToState.amount), offerToState.decimals),
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

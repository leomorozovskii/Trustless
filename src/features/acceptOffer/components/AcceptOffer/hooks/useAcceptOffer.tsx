import { useMemo } from 'react';
import type { TransactionReceipt } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@berezka-dao/core/abis/trustlessOtcAbi';
import { environment } from '@berezka-dao/core/environment';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { useGetBalanceGreater } from '@berezka-dao/features/createOffer/components/Buttons/hooks/useGetBalanceGreater';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';

export const useAcceptOffer = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, setTxHash, acceptId } = useOfferAcceptContext();

  const { tokenTo, formattedAmountTo, isReceiver } = useGetOfferDetails({ id: acceptId });
  const { address } = useAccount();

  const { isGreater } = useGetBalanceGreater({
    tokenAddress: tokenTo?.address,
    tokenAmount: formattedAmountTo,
  });

  const { writeContractAsync: acceptContract } = useWriteContract();

  const acceptTradeRequest = useMemo(() => {
    if (!address || isGreater()) return;

    return {
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'take',
      args: [BigInt(acceptId)],
      account: address,
    };
  }, [acceptId, address, isGreater]);

  const acceptTrade = async () => {
    if (isReceiver === false) {
      throw new Error('You are not the receiver. Change your wallet');
    }
    if (isGreater()) {
      throw new Error('Insufficient balance');
    }
    return acceptContract({
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'take',
      args: [BigInt(acceptId)],
    });
  };

  const onAcceptReceipt = (receipt: TransactionReceipt) => {
    if (!receipt) return;
    handleAddItem({ title: 'Success', text: 'Trade has been accepted', type: 'success' });
    setTxHash(receipt.transactionHash);
    setActiveAcceptStep(OfferProgress.Created);
  };

  return {
    acceptTrade,
    onAcceptReceipt,
    acceptTradeRequest,
  };
};

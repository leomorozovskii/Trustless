import { useMemo } from 'react';
import { maxUint256 } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { environment } from '@berezka-dao/core/environment';
import { useAcceptAllowance } from '@berezka-dao/features/acceptOffer/hooks/useAcceptAllowance';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';
import { useGetBalanceGreater } from '@berezka-dao/shared/hooks/useGetBalanceGreater';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';

export const useAcceptApprove = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, acceptId, isInfinite } = useOfferAcceptContext();
  const { address } = useAccount();
  const { tokenTo, amountTo, formattedAmountTo, isReceiver } = useGetOfferDetails({ id: acceptId });

  const { writeContractAsync: approveContract } = useWriteContract();

  const { refetchAllowance } = useAcceptAllowance();

  const { isGreater } = useGetBalanceGreater({
    tokenAddress: tokenTo?.address,
    tokenAmount: formattedAmountTo,
  });

  const onAcceptApproveReceipt = async () => {
    await refetchAllowance();
    handleAddItem({ title: 'Success', text: 'Tokens have been approved', type: 'success' });
    setActiveAcceptStep(OfferProgress.Approved);
  };

  const acceptApproveRequest = useMemo(() => {
    if (!address || !tokenTo || !amountTo) return;

    const amount = isInfinite ? maxUint256 : amountTo;

    return {
      address: tokenTo?.address,
      abi: customErc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
      account: address,
    };
  }, [address, tokenTo, amountTo, isInfinite]);

  const acceptApproveHandler = async () => {
    if (isReceiver === false) {
      throw new Error('You are not the receiver. Change your wallet');
    }
    if (isGreater() && !isInfinite) {
      throw new Error('Insufficient balance');
    }

    const amount = isInfinite ? maxUint256 : amountTo;

    if (!tokenTo || !amount) return;

    return approveContract({
      address: tokenTo?.address,
      abi: customErc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
    });
  };

  return {
    acceptApproveHandler,
    onAcceptApproveReceipt,
    acceptApproveRequest,
  };
};

import { useMemo } from 'react';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { environment } from '@berezka-dao/core/environment';
import { useAcceptAllowance } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useAcceptAllowance';
import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useTokenInfo';
import { useOfferAcceptContext } from '@berezka-dao/features/acceptOffer/store';
import { useGetBalanceGreater } from '@berezka-dao/features/createOffer/components/Buttons/hooks/useGetBalanceGreater';
import { OfferProgress } from '@berezka-dao/features/createOffer/types';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';

export const useAcceptApprove = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, acceptId, isInfinite } = useOfferAcceptContext();
  const { address } = useAccount();
  const { tokenTo, amountTo, isReceiver } = useGetOfferDetails({ id: acceptId });
  const { tokenDecimals } = useTokenInfo({ address: tokenTo });

  const { writeContractAsync: approveContract } = useWriteContract();

  const { refetchAllowance } = useAcceptAllowance();

  const { isGreater } = useGetBalanceGreater({
    tokenAddress: tokenTo,
    tokenAmount: formatUnits(amountTo || BigInt(0), tokenDecimals),
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
      address: tokenTo,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
      account: address,
    };
  }, [address, tokenTo, amountTo, isInfinite]);

  const acceptApproveHandler = async () => {
    if (isReceiver === false) {
      throw new Error('You are not the receiver. Change your wallet');
    }
    if (isGreater()) {
      throw new Error('Insufficient balance');
    }

    const amount = isInfinite ? maxUint256 : amountTo;

    if (!tokenTo || !amount) return;

    return approveContract({
      address: tokenTo,
      abi: erc20Abi,
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

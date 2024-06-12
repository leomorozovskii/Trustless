import { useMemo } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useAcceptAllowance } from '@components/AcceptOffer/hooks/useAcceptAllowance';
import { useGetBalanceGreater } from '@components/CreateOffer/Buttons/hooks/useGetBalanceGreater';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

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
    tokenAmount: formatUnits(amountTo, tokenDecimals),
  });

  const onAcceptApproveReceipt = async () => {
    await refetchAllowance();
    handleAddItem({ title: 'Success', text: 'Tokens have been approved', type: 'success' });
    setActiveAcceptStep(OfferProgress.Approved);
  };

  const memoizedApproveRequest = useMemo(() => {
    if (!address || !tokenTo || !amountTo || isGreater()) return;

    const amount = isInfinite ? maxUint256 : amountTo;

    return {
      address: tokenTo,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amount],
      account: address,
    };
  }, [address, tokenTo, amountTo, isGreater, isInfinite]);

  const acceptApproveHandler = async () => {
    if (isReceiver === false) {
      throw new Error('You are not the receiver. Change your wallet');
    }
    if (isGreater()) {
      throw new Error('Insufficient balance');
    }

    const amount = isInfinite ? maxUint256 : amountTo;

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
    memoizedApproveRequest,
  };
};

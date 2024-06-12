import { useWriteContract } from 'wagmi';
import { erc20Abi, formatUnits } from 'viem';

import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useAcceptAllowance } from '@components/AcceptOffer/hooks/useAcceptAllowance';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';
import { useGetBalanceGreater } from '@components/CreateOffer/Buttons/hooks/useGetBalanceGreater';

export const useAcceptApprove = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, acceptId } = useOfferAcceptContext();

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

  const acceptApproveHandler = async () => {
    if (isReceiver === false) {
      throw new Error('You are not the receiver. Change your wallet');
    }
    if (isGreater()) {
      throw new Error('Insufficient balance');
    }
    return approveContract({
      address: tokenTo,
      abi: erc20Abi,
      functionName: 'approve',
      args: [environment.contractAddress, amountTo],
    });
  };

  return {
    acceptApproveHandler,
    onAcceptApproveReceipt,
  };
};

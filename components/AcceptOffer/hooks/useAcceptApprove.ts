import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { erc20Abi, formatUnits } from 'viem';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';
import { useAcceptAllowance } from '@components/AcceptOffer/hooks/useAcceptAllowance';

export const useAcceptApprove = () => {
  const { handleAddItem } = useToastifyContext();
  const { address: userAddress } = useAccount();
  const { setActiveAcceptStep } = useOfferAcceptContext();

  const { tokenTo, amountTo } = useGetOfferDetails();
  const { tokenDecimals } = useTokenInfo({ address: tokenTo });

  const { data: balance } = useBalance({ address: userAddress, token: tokenTo });

  const { writeContractAsync: approveContract } = useWriteContract();

  useAcceptAllowance();

  const isGreater = () => {
    if (!balance) return false;
    return Number(formatUnits(amountTo, tokenDecimals)) > Number(balance.formatted);
  };

  const onAcceptApproveReceipt = () => {
    handleAddItem({ title: 'Success', text: 'Tokens have been approved', type: 'success' });
    setActiveAcceptStep(OfferProgress.Approved);
  };

  const acceptApproveHandler = async () => {
    if (isGreater()) {
      handleAddItem({ title: 'Error', text: 'Insufficient balance', type: 'error' });
      return;
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

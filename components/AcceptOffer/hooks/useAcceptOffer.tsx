import { formatUnits, TransactionReceipt } from 'viem';
import { useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';
import { useGetBalanceGreater } from '@components/CreateOffer/Buttons/hooks/useGetBalanceGreater';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@lib/environment';

export const useAcceptOffer = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, setTxHash, acceptId } = useOfferAcceptContext();

  const { tokenTo, amountTo } = useGetOfferDetails({ id: acceptId });
  const { tokenDecimals } = useTokenInfo({ address: tokenTo });

  const { isGreater } = useGetBalanceGreater({
    tokenAddress: tokenTo,
    tokenAmount: formatUnits(amountTo, tokenDecimals),
  });

  const { writeContractAsync: acceptContract } = useWriteContract();

  const acceptTrade = async () => {
    if (!acceptId) return;
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
  };
};

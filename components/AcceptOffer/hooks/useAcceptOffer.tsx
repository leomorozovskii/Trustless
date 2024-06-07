import { TransactionReceipt } from 'viem';
import { useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@/environment';

export const useAcceptOffer = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, setTxHash, acceptId } = useOfferAcceptContext();

  const { writeContractAsync: acceptContract } = useWriteContract();

  const acceptTrade = async () => {
    if (!acceptId) return;
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

import { useEffect } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useOfferAcceptContext } from '@context/offer/accept/OfferAcceptContext';
import { OfferProgress } from '@lib/constants';
import { environment } from '@/environment';

export const useAcceptOffer = () => {
  const { handleAddItem } = useToastifyContext();
  const { setActiveAcceptStep, setTxHash, acceptId } = useOfferAcceptContext();

  const { data: acceptHash, writeContractAsync: acceptContract } = useWriteContract();
  const { data: acceptReceipt } = useWaitForTransactionReceipt({ hash: acceptHash });

  const acceptTrade = async () => {
    if (!acceptId) return;
    return acceptContract({
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'take',
      args: [BigInt(acceptId)],
    });
  };

  useEffect(() => {
    if (!acceptReceipt) return;
    handleAddItem({ title: 'Success', text: 'Trade has been accepted', type: 'success' });
    setTxHash(acceptReceipt.transactionHash);
    setActiveAcceptStep(OfferProgress.Created);
  }, [acceptReceipt]);

  return {
    acceptTrade,
  };
};

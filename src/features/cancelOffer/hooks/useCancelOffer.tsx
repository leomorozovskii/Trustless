import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useAccount, useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@berezka-dao/core/abis/trustlessOtcAbi';
import { environment } from '@berezka-dao/core/environment';
import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { useGetOfferDetails } from '@berezka-dao/shared/retrieve-data/useGetOfferDetails';

export const useCancelOffer = ({ cancelId }: { cancelId: string }) => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { address } = useAccount();
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { writeContractAsync: cancelContract } = useWriteContract();

  const cancelRequest = useMemo(() => {
    if (!isCreator || !address) return;

    return {
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'cancelTrade',
      args: [BigInt(cancelId)],
      account: address,
    };
  }, [address, cancelId, isCreator]);

  const cancelOffer = async () => {
    if (!cancelId || !isCreator) return;
    return cancelContract({
      address: environment.contractAddress,
      abi: trustlessOtcAbi,
      functionName: 'cancelTrade',
      args: [BigInt(cancelId)],
    });
  };

  const onCancelReceipt = () => {
    handleAddItem({ title: 'Success', text: 'Trade has been canceled', type: 'success' });
    router.push('/');
  };

  return {
    cancelOffer,
    onCancelReceipt,
    cancelRequest,
  };
};

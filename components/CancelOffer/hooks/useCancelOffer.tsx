import { useWriteContract } from 'wagmi';
import { useRouter } from 'next/navigation';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { environment } from '@lib/environment';

export const useCancelOffer = ({ cancelId }: { cancelId: string }) => {
  const router = useRouter();
  const { handleAddItem } = useToastifyContext();
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { writeContractAsync: cancelContract } = useWriteContract();

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
  };
};

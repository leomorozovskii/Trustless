import { useWriteContract } from 'wagmi';

import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { environment } from '@/environment';

const useWriteCancelTrade = () => {
  const writeContract = useWriteContract();
  return {
    ...writeContract,
    writeContract: (offerId: string) => {
      return writeContract.writeContract({
        address: environment.contractAddress,
        abi: trustlessOtcAbi,
        functionName: 'cancelTrade',
        args: [BigInt(offerId)],
      });
    },
    writeContractAsync: (offerId: string) => {
      return writeContract.writeContractAsync({
        address: environment.contractAddress,
        abi: trustlessOtcAbi,
        functionName: 'cancelTrade',
        args: [BigInt(offerId)],
      });
    },
  };
};

export { useWriteCancelTrade };

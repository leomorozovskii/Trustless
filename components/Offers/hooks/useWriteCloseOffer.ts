import { environment } from '@/environment';
import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { Address } from 'viem';
import { useWriteContract } from 'wagmi';

const useWriteCancelTrade = () => {
  const writeContract = useWriteContract();
  return {
    ...writeContract,
    writeContract: (offerId: string) => {
      return writeContract.writeContract({
        address: environment.contractAddress as Address,
        abi: trustlessOtcAbi,
        functionName: 'cancelTrade',
        args: [BigInt(offerId)],
      });
    },
    writeContractAsync: (offerId: string) => {
      return writeContract
        .writeContractAsync({
          address: environment.contractAddress as Address,
          abi: trustlessOtcAbi,
          functionName: 'cancelTrade',
          args: [BigInt(offerId)],
        })
        .then((tx) => {
          return tx;
        });
    },
  };
};

export { useWriteCancelTrade };

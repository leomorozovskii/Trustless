import { useReadContract } from 'wagmi';
import { trustlessOtcAbi } from '@assets/abis/trustlessOtcAbi';
import { environment } from '@/environment';
import { useMemo } from 'react';

export const useGetFee = () => {
  const { data: fee } = useReadContract({
    address: environment.contractAddress,
    abi: trustlessOtcAbi,
    functionName: 'feeBasisPoints',
    args: [],
  });

  const calculatedFee = useMemo(() => {
    if (!fee) return;
    return (Number(fee) / 10000) * 100;
  }, [fee]);

  return {
    calculatedFee,
  };
};

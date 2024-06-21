import { useMemo } from 'react';
import { useReadContract } from 'wagmi';

import { trustlessOtcAbi } from '@berezka-dao/core/abis/trustlessOtcAbi';
import { environment } from '@berezka-dao/core/environment';

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

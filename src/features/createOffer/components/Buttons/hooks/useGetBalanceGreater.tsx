import { useCallback } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import type { Address } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

interface IUseGetBalanceGreater {
  tokenAddress?: Address;
  tokenAmount: string;
}

export const useGetBalanceGreater = ({ tokenAddress, tokenAmount }: IUseGetBalanceGreater) => {
  const { address: userAddress } = useAccount();

  const { data: result } = useReadContracts(
    userAddress && {
      allowFailure: false,
      contracts: [
        {
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'decimals',
        },
        {
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'balanceOf',
          args: [userAddress],
        },
      ],
    },
  );

  const isGreater = useCallback(() => {
    if (!result) return;
    return Number(tokenAmount) > Number(formatUnits(result[1], result[0]));
  }, [result, tokenAmount]);
  return {
    isGreater,
  };
};

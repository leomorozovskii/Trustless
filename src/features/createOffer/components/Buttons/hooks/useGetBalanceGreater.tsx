import { useCallback } from 'react';
import { formatUnits } from 'viem';
import type { Address } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';

type Props = {
  tokenAddress?: Address;
  tokenAmount?: string;
};

export const useGetBalanceGreater = ({ tokenAddress, tokenAmount }: Props) => {
  const { address: userAddress } = useAccount();

  const { data: [decimals, balanceOf] = [] } = useReadContracts(
    userAddress &&
      tokenAddress && {
        allowFailure: false,
        contracts: [
          {
            address: tokenAddress,
            abi: customErc20Abi,
            functionName: 'decimals',
          },
          {
            address: tokenAddress,
            abi: customErc20Abi,
            functionName: 'balanceOf',
            args: [userAddress],
          },
        ],
      },
  );

  const isGreater = useCallback(() => {
    if (!decimals || balanceOf === undefined || !tokenAmount) return;
    return Number(tokenAmount) > Number(formatUnits(balanceOf, decimals));
  }, [decimals, balanceOf, tokenAmount]);
  return {
    isGreater,
  };
};

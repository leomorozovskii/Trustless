import { useCallback } from 'react';
import type { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';

interface IUseGetBalanceGreater {
  tokenAddress: Address;
  tokenAmount: string;
}

export const useGetBalanceGreater = ({ tokenAddress, tokenAmount }: IUseGetBalanceGreater) => {
  const { address: userAddress } = useAccount();

  const { data: balance } = useBalance({
    address: userAddress,
    token: tokenAddress,
  });

  const isGreater = useCallback(() => {
    if (!balance) return;
    return Number(tokenAmount) > Number(balance.formatted);
  }, [balance, tokenAmount]);

  return {
    isGreater,
  };
};

import { useCallback } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Address } from 'viem';

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
  }, [tokenAddress, balance, tokenAmount]);

  return {
    isGreater,
  };
};

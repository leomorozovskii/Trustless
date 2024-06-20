'use client';

import { useMemo } from 'react';
import type { Address } from 'viem';
import { formatUnits, erc20Abi } from 'viem';
import { useReadContract, useReadContracts } from 'wagmi';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

type Props = {
  address?: Address;
  userAddress?: Address;
};

export const useTokenInfo = ({ address, userAddress }: Props) => {
  const { data: [decimals, symbol] = [] } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address,
        abi: erc20Abi,
        functionName: 'symbol',
      },
    ],
  });

  const { data: balanceOf } = useReadContract(
    userAddress && {
      address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    },
  );

  const token = useMemo(() => {
    if (!address) return;
    const localToken = TOKEN_MAP[address];
    if (!localToken && decimals && symbol) {
      return { decimals, symbol };
    }
    return localToken;
  }, [address, decimals, symbol]);

  const TokenLogo = useMemo(() => {
    if (token && 'logo' in token) {
      return token.logo;
    }
    return UnknownIcon;
  }, [token]);

  const tokenName = useMemo(() => {
    if (!token) return;
    return token.symbol;
  }, [token]);

  const balance = useMemo(() => {
    if (!balanceOf || !decimals) return '0';
    return formatUnits(balanceOf, decimals);
  }, [balanceOf, decimals]);

  return {
    TokenLogo,
    tokenName,
    tokenDecimals: decimals,
    tokenDisplayBalance: balance,
  };
};

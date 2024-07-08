'use client';

import { useMemo } from 'react';
import type { Address } from 'viem';
import { formatUnits } from 'viem';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

type Props = {
  address?: Address;
};

export const useTokenInfo = ({ address }: Props) => {
  const { address: userAddress } = useAccount();
  const { data: [decimals, symbol] = [] } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address,
        abi: customErc20Abi,
        functionName: 'decimals',
      },
      {
        address,
        abi: customErc20Abi,
        functionName: 'symbol',
      },
    ],
  });

  const { data: balanceOf } = useReadContract(
    userAddress && {
      address,
      abi: customErc20Abi,
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

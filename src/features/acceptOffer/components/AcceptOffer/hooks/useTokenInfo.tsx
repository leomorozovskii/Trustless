'use client';

import { useMemo } from 'react';
import type { Address } from 'viem';
import { erc20Abi } from 'viem';
import { useReadContracts } from 'wagmi';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

type Props = {
  address?: Address;
};

export const useTokenInfo = ({ address }: Props) => {
  const shouldLoad = useMemo(() => {
    if (address && !TOKEN_MAP[address]?.address) return true;
    return;
  }, [address]);

  const { data: [decimals, symbol] = [] } = useReadContracts(
    shouldLoad && {
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

  return {
    TokenLogo,
    tokenName,
  };
};

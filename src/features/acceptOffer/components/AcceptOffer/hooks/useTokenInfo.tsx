'use client';

import { useMemo } from 'react';
import type { Address } from 'viem';
import { formatUnits, erc20Abi } from 'viem';
import { useReadContracts } from 'wagmi';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { useGetFee } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetFee';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

type Props = {
  address?: Address;
  amount?: bigint;
  withFee?: boolean;
};

export const useTokenInfo = ({ address, amount, withFee }: Props) => {
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

  const { calculatedFee } = useGetFee();

  const token = useMemo(() => {
    if (!address) return;
    const localToken = TOKEN_MAP[address];
    if (!localToken && decimals && symbol) {
      return { decimals, symbol };
    }
    return localToken;
  }, [address, decimals, symbol]);

  const isCustom = useMemo(() => {
    if (!address) return;

    return !TOKEN_MAP[address];
  }, [address]);

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

  const tokenDecimals = useMemo(() => {
    if (!token) return;
    return token.decimals;
  }, [token]);

  const tokenValue = useMemo(() => {
    if (!tokenDecimals || !amount) return;
    return formatUnits(amount, tokenDecimals);
  }, [amount, tokenDecimals]);

  const tokenFeeValue = useMemo(() => {
    if (!tokenDecimals || !withFee || !calculatedFee) return;
    if (amount) {
      const value = formatUnits(amount, tokenDecimals);
      return Number((Number(value) - (Number(value) / 100) * calculatedFee).toFixed(9));
    }
  }, [amount, tokenDecimals, calculatedFee, withFee]);

  return {
    TokenLogo,
    tokenName,
    tokenValue: withFee ? tokenFeeValue : tokenValue,
    isCustom,
    tokenDecimals: tokenDecimals || 0,
  };
};

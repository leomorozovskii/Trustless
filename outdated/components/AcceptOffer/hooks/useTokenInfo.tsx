'use client';

import { UnknownIcon } from '@assets/icons/tokens';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';
import { TOKEN_MAP } from '@lib/constants';
import { useMemo } from 'react';
import type { Address } from 'viem';
import { formatUnits } from 'viem';
import { useToken } from 'wagmi';

interface IUseTokenInfo {
  address: Address;
  amount?: bigint;
  withFee?: boolean;
}

export const useTokenInfo = ({ address, amount, withFee }: IUseTokenInfo) => {
  const result = useToken({
    address,
  });

  const { calculatedFee } = useGetFee();

  const token = useMemo(() => {
    if (!address) return;
    const localToken = TOKEN_MAP[address];
    if (!localToken && result) {
      return result;
    }
    return localToken;
  }, [address, result]);

  const isCustom = useMemo(() => {
    return !TOKEN_MAP[address];
  }, [address]);

  const TokenLogo = useMemo(() => {
    if (token && 'logo' in token) {
      return token.logo;
    }
    return UnknownIcon;
  }, [token, result]);

  const tokenName = useMemo(() => {
    if (!token) return;
    if ('name' in token) return token.name;
    return token.data?.symbol;
  }, [token, result]);

  const tokenDecimals = useMemo(() => {
    if (!token) return;
    if ('decimals' in token) return token.decimals;
    return token.data?.decimals;
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

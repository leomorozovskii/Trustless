'use client';

import { useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useToken } from 'wagmi';

import { UnknownIcon } from '@assets/icons/tokens';
import { TOKEN_MAP } from '@lib/constants';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';

export const useTokenInfo = (address: Address, amount?: bigint, withFee?: boolean) => {
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
    return token.data?.name;
  }, [token, result]);

  const tokenDecimals = useMemo(() => {
    if (!token) return;
    if ('decimals' in token) return token.decimals;
    return token.data?.decimals;
  }, [token, result]);

  const tokenValue = useMemo(() => {
    if (!tokenDecimals || !amount) return;
    return formatUnits(amount, tokenDecimals);
  }, [amount, tokenDecimals]);

  const tokenFeeValue = useMemo(() => {
    if (!tokenDecimals || !amount || !withFee || !calculatedFee) return;
    const value = formatUnits(amount, tokenDecimals);
    return (1 - calculatedFee) * Number(value);
  }, [amount, tokenDecimals, calculatedFee, withFee]);

  return {
    TokenLogo,
    tokenName,
    tokenValue: withFee ? tokenFeeValue : tokenValue,
    isCustom,
    tokenDecimals: tokenDecimals || 0,
  };
};

'use client';

import { useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useToken } from 'wagmi';

import { UnknownIcon } from '@assets/icons/tokens';
import { TOKEN_MAP } from '@lib/constants';
import { useGetFee } from '@components/AcceptOffer/hooks/useGetFee';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

interface IUseTokenInfo {
  address: Address;
  amount?: bigint;
  withFee?: boolean;
}

export const useTokenInfo = ({ address, amount, withFee }: IUseTokenInfo) => {
  const { offerFromState } = useOfferCreateContext();
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
  }, [token, result]);

  const tokenValue = useMemo(() => {
    if (!tokenDecimals || !amount) return;
    return formatUnits(amount, tokenDecimals);
  }, [amount, tokenDecimals]);

  const tokenFeeValue = useMemo(() => {
    if (!tokenDecimals || !withFee || !calculatedFee) return;
    if (amount) {
      const value = formatUnits(amount, tokenDecimals);
      return (1 - calculatedFee) * Number(value);
    }
    if (offerFromState.amount) {
      return Number(calculatedFee * Number(offerFromState.amount));
    }
  }, [amount, tokenDecimals, calculatedFee, withFee, offerFromState]);

  return {
    TokenLogo,
    tokenName,
    tokenValue: withFee ? tokenFeeValue : tokenValue,
    isCustom,
    tokenDecimals: tokenDecimals || 0,
  };
};

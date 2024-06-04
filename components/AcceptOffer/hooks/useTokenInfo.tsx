import { useMemo } from 'react';
import { Address, formatUnits } from 'viem';
import { useToken } from 'wagmi';

import { UnknownIcon } from '@assets/icons/tokens';
import { TOKEN_MAP } from '@lib/constants';

export const useTokenInfo = (address: Address, amount?: bigint) => {
  const result = useToken({
    address,
  });

  const token = useMemo(() => {
    if (!address) return;
    const localToken = TOKEN_MAP[address];
    if (!localToken && result) return result;
    return localToken;
  }, [address, result]);

  const TokenLogo = useMemo(() => {
    if (token && 'logo' in token) return token.logo;
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
    if (!tokenDecimals) return;
    if (!amount) return;
    return formatUnits(amount, tokenDecimals);
  }, [amount, tokenDecimals]);

  return {
    TokenLogo,
    tokenName,
    tokenValue,
    tokenDecimals: tokenDecimals || 0,
  };
};

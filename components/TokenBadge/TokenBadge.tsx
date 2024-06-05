import React, { useMemo } from 'react';

import { TOKEN_MAP, TokenAddress } from '@lib/constants';

import s from './TokenBadge.module.scss';

interface TokenBadgeProps {
  address: string;
}

const TokenBadge: React.FC<TokenBadgeProps> = ({ address }) => {
  const token = useMemo(() => {
    if (!address) return TOKEN_MAP[TokenAddress.UNKNOWN];
    const data = TOKEN_MAP[address.toLowerCase()];
    return data || TOKEN_MAP[TokenAddress.UNKNOWN];
  }, [address]);

  return (
    <div className={s.container}>
      <token.logo className={s.logo} />
      <span className={s.text}>{token.name}</span>
    </div>
  );
};

export default TokenBadge;

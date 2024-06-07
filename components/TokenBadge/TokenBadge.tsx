import React, { useMemo } from 'react';

import { UnknownIcon } from '@assets/icons/tokens';
import { TOKEN_MAP } from '@lib/constants';

import s from './TokenBadge.module.scss';

interface TokenBadgeProps {
  address: string;
}

const TokenBadge: React.FC<TokenBadgeProps> = ({ address }) => {
  const TokenLogo = useMemo(() => {
    if (!address) return UnknownIcon;
    const data = TOKEN_MAP[address.toLowerCase()].logo;
    return data || UnknownIcon;
  }, [address]);

  const tokenName = useMemo(() => {
    if (!address) return 'UNKNOWN';
    const data = TOKEN_MAP[address.toLowerCase()].name;
    return data || 'UNKNOWN';
  }, [address]);

  return (
    <div className={s.container}>
      <TokenLogo className={s.logo} />
      <span className={s.text}>{tokenName}</span>
    </div>
  );
};

export default TokenBadge;

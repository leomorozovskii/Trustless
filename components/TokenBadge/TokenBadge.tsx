import React, { memo } from 'react';

import { TOKEN_MAP, TokenAddress } from '@lib/constants';

import s from './TokenBadge.module.scss';

interface TokenBadgeProps {
  address: string;
}

const TokenBadge: React.FC<TokenBadgeProps> = ({ address }) => {
  const token = address
    ? TOKEN_MAP[address.toLowerCase()]
    : TOKEN_MAP[TokenAddress.UNKNOWN];

  return (
    <div className={s.container}>
      <token.logo className={s.logo} />
      <span className={s.text}>{token.name}</span>
    </div>
  );
};

export default memo(TokenBadge);

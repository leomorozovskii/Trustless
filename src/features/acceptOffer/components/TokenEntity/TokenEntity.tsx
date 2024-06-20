import type { FC } from 'react';
import { useMemo } from 'react';
import type { Address } from 'viem';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

import s from './TokenEntity.module.scss';

type Props = {
  type: 'pay' | 'get';
  address?: Address;
  amount?: string;
  name?: string;
};

const TokenEntity: FC<Props> = ({ address, amount, name, type }) => {
  const TokenLogo = useMemo(() => {
    if (!address) return UnknownIcon;
    const logo = TOKEN_MAP[address]?.logo;
    if (!logo) return UnknownIcon;
    return logo;
  }, [address]);

  return (
    <div className={s.tokenWrapper}>
      <TokenLogo className={s.logo} />
      <div className={s.tokenContainer}>
        <h2 className={s.tokenSum}>{amount}</h2>
        <p className={s.tokenName}>
          You {type} {name}
        </p>
      </div>
    </div>
  );
};

export { TokenEntity };

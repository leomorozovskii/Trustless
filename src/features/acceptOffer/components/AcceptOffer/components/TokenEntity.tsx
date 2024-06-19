import type { FC } from 'react';
import type { Address } from 'viem';

import { useTokenInfo } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useTokenInfo';

import s from '../AcceptOffer.module.scss';

type Props = {
  type: 'pay' | 'get';
  address?: Address;
  amount?: string;
};

const TokenEntity: FC<Props> = ({ address, amount, type }) => {
  const { TokenLogo, tokenName } = useTokenInfo({
    address,
  });

  return (
    <div className={s.tokenWrapper}>
      <TokenLogo className={s.logo} />
      <div className={s.tokenContainer}>
        <h2 className={s.tokenSum}>{amount}</h2>
        <p className={s.tokenName}>
          You {type} {tokenName}
        </p>
      </div>
    </div>
  );
};

export { TokenEntity };

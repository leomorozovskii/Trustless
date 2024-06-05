import React from 'react';
import { Address } from 'viem';

import { useTokenInfo } from '@components/AcceptOffer/hooks/useTokenInfo';

import s from '../AcceptOffer.module.scss';

interface ITokenEntity {
  address: Address;
  amount: bigint;
  type: 'pay' | 'get';
}

const TokenEntity: React.FC<ITokenEntity> = ({ address, amount, type }) => {
  const { TokenLogo, tokenName, tokenValue } = useTokenInfo(address, amount);

  return (
    <div className={s.tokenWrapper}>
      <TokenLogo className={s.logo} />
      <div className={s.tokenContainer}>
        <h2 className={s.tokenSum}>{tokenValue}</h2>
        <p className={s.tokenName}>
          You {type} {tokenName}
        </p>
      </div>
    </div>
  );
};

export default TokenEntity;

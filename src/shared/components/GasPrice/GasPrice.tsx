import React from 'react';
import { Tooltip } from 'react-tooltip';

import { GasIcon, InfoIcon } from '@berezka-dao/shared/icons';

import s from './GasPrice.module.scss';

interface IGasPrice {
  minFee: string | null;
}

const GasPrice: React.FC<IGasPrice> = ({ minFee }) => {
  return (
    <div className={s.serviceContainer}>
      <p className={s.feeLabel}>Min gas price</p>
      <div className={s.feeContainer}>
        <GasIcon />
        <p className={s.feeLabel}>{minFee ? `~ $${minFee}` : 'N/A'}</p>
        {!minFee && (
          <>
            <Tooltip id="my-tooltip" />
            <div data-tooltip-id="my-tooltip" data-tooltip-content="Impossible to calculate gas price">
              <InfoIcon className={s.info} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { GasPrice };

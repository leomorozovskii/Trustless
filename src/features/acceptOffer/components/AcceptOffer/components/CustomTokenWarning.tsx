import Link from 'next/link';
import type { FC } from 'react';

import { links } from '@berezka-dao/core/constants';
import { NewWindowIcon, WarningIcon } from '@berezka-dao/shared/icons';

import s from '../AcceptOffer.module.scss';

interface ICustomTokenWarning {
  name: string | undefined;
  address: string;
}

const CustomTokenWarning: FC<ICustomTokenWarning> = ({ name, address }) => {
  return (
    <div className={s.warnContainer}>
      <div className={s.warning}>
        <WarningIcon width={24} height={24} />
      </div>
      <div className={s.warnParagraph}>
        <p className={s.warnText}>
          The <span className={s.warnTokenName}>{name}</span> token you receive is a custom one. Please check the
          token’s address and make sure it’s correct
        </p>
        <div className={s.warnShareAddress}>
          <p className={s.warnTokenName}>{address}</p>
          <Link target="_blank" rel="noreferrer" href={`${links.etherscan}/token/${address}`} className={s.warning}>
            <NewWindowIcon className={s.warn} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { CustomTokenWarning };

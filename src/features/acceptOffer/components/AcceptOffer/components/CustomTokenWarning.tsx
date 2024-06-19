import Link from 'next/link';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';

import { links } from '@berezka-dao/core/constants';
import { NewWindowIcon, WarningIcon } from '@berezka-dao/shared/icons';

import s from '../AcceptOffer.module.scss';

type Props = {
  name: string | undefined;
  address?: Address;
};

const CustomTokenWarning: FC<Props> = ({ name, address }) => {
  const { t } = useTranslation();

  return (
    <div className={s.warnContainer}>
      <div className={s.warning}>
        <WarningIcon width={24} height={24} />
      </div>
      <div className={s.warnParagraph}>
        <p className={s.warnText}>
          {t('offer.accept.the')} <span className={s.warnTokenName}>{name}</span> {t('offer.accept.tokenYouReceive')}
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

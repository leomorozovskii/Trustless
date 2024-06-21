import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';

import { AcceptOfferIcon } from '@berezka-dao/shared/icons';

import s from './ReceiverContainer.module.scss';

type Props = {
  receiver?: Address;
};

const ReceiverContainer: FC<Props> = ({ receiver }) => {
  const { t } = useTranslation();

  return (
    <div className={s.arrowContainer}>
      <AcceptOfferIcon />
      <div className={s.tokenContainer}>
        <h2 className={s.receiverAddress}>{receiver}</h2>
        <p className={s.receiver}>{t('offer.accept.receiver')}</p>
      </div>
    </div>
  );
};

export { ReceiverContainer };

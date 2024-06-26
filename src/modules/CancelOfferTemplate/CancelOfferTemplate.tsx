import type { FC } from 'react';

import { CancelOffer } from '@berezka-dao/features/cancelOffer';
import { CancelInfo } from '@berezka-dao/features/cancelOffer/components/CancelInfo/CancelInfo';

import s from './CancelOfferTemplate.module.scss';

type Props = {
  id: string;
};

const CancelOfferTemplate: FC<Props> = ({ id }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.heading}>
          <h2 className={s.label}>Cancel offer #{id}</h2>
        </div>
        <CancelInfo cancelId={id} />
        <CancelOffer cancelId={id} />
      </div>
    </div>
  );
};

export { CancelOfferTemplate };

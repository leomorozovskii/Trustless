import type { FC } from 'react';

import { ShareOfferContainer } from '@berezka-dao/features/shareOffer/components/ShareOfferContainer';

import s from './ShareOfferTemplate.module.scss';

type Props = {
  id: string;
};

const ShareOfferTemplate: FC<Props> = ({ id }) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Share your offer</h2>
      <ShareOfferContainer offerId={id} />
    </div>
  );
};

export { ShareOfferTemplate };

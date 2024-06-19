import React from 'react';
import type { Address } from 'viem';

import { AcceptOfferIcon } from '@berezka-dao/shared/icons';

import s from '../AcceptOffer.module.scss';

type ReceiverContainerProps = {
  receiver: Address;
};

const ReceiverContainer: React.FC<ReceiverContainerProps> = ({ receiver }) => {
  return (
    <div className={s.arrowContainer}>
      <AcceptOfferIcon />
      <div className={s.tokenContainer}>
        <h2 className={s.receiverAddress}>{receiver}</h2>
        <p className={s.receiver}>Receiver</p>
      </div>
    </div>
  );
};

export { ReceiverContainer };

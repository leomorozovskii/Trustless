import React from 'react';

import { AcceptOfferIcon } from '@assets/icons';

import { Address } from 'viem';
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

export default ReceiverContainer;

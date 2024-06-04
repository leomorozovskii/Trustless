import React, { memo } from 'react';

import { AcceptOfferIcon } from '@assets/icons';

import s from '../AcceptOffer.module.scss';

const ReceiverContainer = () => {
  //  TODO add real data
  return (
    <div className={s.arrowContainer}>
      <AcceptOfferIcon />
      <div className={s.tokenContainer}>
        <h2 className={s.receiverAddress}>0x0000000000000000000000000000</h2>
        <p className={s.receiver}>Receiver</p>
      </div>
    </div>
  );
};

export default memo(ReceiverContainer);

import React from 'react';

import { NewWindowIcon } from '@assets/icons';

import s from './OfferStatus.module.scss';

interface OfferStatusProps {
  status: string;
  offerId: number;
}

const OfferStatus: React.FC<OfferStatusProps> = ({ status, offerId }) => {
  const handleButtonClick = () => {
    // TODO: add offer link
    console.log('offerId', offerId);
  };

  return (
    <div className={s.statusContainer}>
      <span>{status}</span>
      <button
        aria-label="View Offer"
        type="button"
        className={s.viewOfferButton}
        onClick={handleButtonClick}
      >
        <NewWindowIcon />
      </button>
    </div>
  );
};

export default OfferStatus;

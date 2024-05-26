import React from 'react';
import s from './OfferStatus.module.scss';
import { NewWindowIcon } from '@assets/icons';

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
      <button className={s.viewOfferButton} onClick={handleButtonClick}>
        <NewWindowIcon />
      </button>
    </div>
  );
};

export default OfferStatus;

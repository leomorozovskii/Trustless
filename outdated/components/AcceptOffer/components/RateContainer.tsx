import React from 'react';

import s from '../AcceptOffer.module.scss';

interface IRateProps {
  value: string | undefined;
}

const RateContainer: React.FC<IRateProps> = ({ value }) => {
  return (
    <div className={s.rateContainer}>
      <h2 className={s.rate}>{value}</h2>
      <p className={s.rateLabel}>Rate</p>
    </div>
  );
};

export default RateContainer;

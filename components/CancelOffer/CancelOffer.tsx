import React from 'react';

import { GasIcon } from '@assets/icons';
import { TxButton } from '@components/TxFlow';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useCancelOffer } from '@components/CancelOffer/hooks/useCancelOffer';
import { useOfferCancelContext } from '@context/offer/cancel/OfferCancelContext';

import s from './CancelOffer.module.scss';

const CancelOffer = () => {
  const { cancelId } = useOfferCancelContext();
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { cancelOffer, onCancelReceipt } = useCancelOffer();

  return (
    <div className={s.container}>
      <TxButton
        type="button"
        disabled={!isCreator}
        errorTitle="Cancel error"
        onReceipt={(receipt) => onCancelReceipt(receipt)}
        writeContract={cancelOffer}
      >
        {({ isLoading: isButtonLoading }) => (isButtonLoading ? 'Canceling Trade' : 'Cancel Trade')}
      </TxButton>
      <div className={s.serviceContainer}>
        <p className={s.feeLabel}>Gas fee</p>
        <div className={s.feeContainer}>
          <GasIcon />
          {/* TODO: calculate a real number */}
          <p className={s.feeLabel}>11.43%</p>
        </div>
      </div>
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export default CancelOffer;

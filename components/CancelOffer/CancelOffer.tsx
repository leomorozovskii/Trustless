import React from 'react';

import { GasIcon } from '@assets/icons';
import { TxButton } from '@components/TxFlow';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useCancelOffer } from '@components/CancelOffer/hooks/useCancelOffer';
import { useGetMinFee } from '@components/CreateOffer/Buttons/hooks/useGetMinFee';

import s from './CancelOffer.module.scss';

const CancelOffer = ({ cancelId }: { cancelId: string }) => {
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { cancelOffer, onCancelReceipt, memoizedCancelRequest } = useCancelOffer({ cancelId });
  const { minFee } = useGetMinFee({ data: memoizedCancelRequest, active: true });

  return (
    <div className={s.container}>
      <TxButton
        type="button"
        disabled={!isCreator}
        errorTitle="Cancel error"
        onReceipt={onCancelReceipt}
        writeContract={cancelOffer}
      >
        {({ isLoading: isButtonLoading }) => (isButtonLoading ? 'Canceling Trade' : 'Cancel Trade')}
      </TxButton>
      <div className={s.serviceContainer}>
        <p className={s.feeLabel}>Min gas price</p>
        <div className={s.feeContainer}>
          <GasIcon />
          <p className={s.feeLabel}>~ ${minFee}</p>
        </div>
      </div>
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export default CancelOffer;

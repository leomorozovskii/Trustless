import React from 'react';

import { TxButton } from '@components/TxFlow';
import { GasPrice } from '@components/GasPrice';
import { useGetOfferDetails } from '@components/AcceptOffer/hooks/useGetOfferDetails';
import { useCancelOffer } from '@components/CancelOffer/hooks/useCancelOffer';
import { useGetMinFee } from '@components/CreateOffer/Buttons/hooks/useGetMinFee';

import s from './CancelOffer.module.scss';

const CancelOffer = ({ cancelId }: { cancelId: string }) => {
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { cancelOffer, onCancelReceipt, cancelRequest } = useCancelOffer({ cancelId });
  const { minFee } = useGetMinFee({ data: cancelRequest });

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
      <GasPrice minFee={minFee} />
      <p className={s.terms}>
        By continuing, you accept <span className={s.conditions}>Terms & Conditions</span>
      </p>
    </div>
  );
};

export default CancelOffer;

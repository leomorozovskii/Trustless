import React from 'react';

import { useGetOfferDetails } from '@berezka-dao/features/acceptOffer/components/AcceptOffer/hooks/useGetOfferDetails';
import { useGetMinFee } from '@berezka-dao/features/createOffer/components/Buttons/hooks/useGetMinFee';
import { GasPrice } from '@berezka-dao/shared/components/GasPrice';
import { TxButton } from '@berezka-dao/shared/components/TxFlow';

import s from './CancelOffer.module.scss';
import { useCancelOffer } from './hooks/useCancelOffer';

const CancelOffer = ({ cancelId }: { cancelId: string }) => {
  const { isCreator } = useGetOfferDetails({ id: cancelId });

  const { cancelOffer, onCancelReceipt, cancelRequest } = useCancelOffer({ cancelId });
  const { minFee } = useGetMinFee({ data: cancelRequest, active: true });

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

export { CancelOffer };

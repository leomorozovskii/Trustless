import { useEffect, useState } from 'react';
import { isAddress } from 'viem';

import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { OfferProgress } from '@lib/constants';

export const useButtonsDisabled = () => {
  const { activeStep, offerFromState, offerToState } = useOfferCreateContext();
  const [approveButtonDisabled, setApproveButtonDisabled] = useState<boolean>(true);
  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isOfferFromStateValid =
      offerFromState.from !== '' &&
      !Number.isNaN(Number(offerFromState.amount)) &&
      Number(offerFromState.amount) > 0 &&
      offerFromState.rate > 0;
    const isOfferToStateValid =
      offerToState.to !== '' && !Number.isNaN(Number(offerToState.amount)) && Number(offerToState.amount) > 0;
    const isReceiverValid = !offerToState.receiver || isAddress(offerToState.receiver);
    const isApproveValid = isOfferFromStateValid && isOfferToStateValid && isReceiverValid;
    const isCreateValid = isApproveValid && activeStep === OfferProgress.Approved;

    setApproveButtonDisabled(!isApproveValid);
    setCreateButtonDisabled(!isCreateValid);
  }, [activeStep, offerFromState, offerToState]);

  return {
    approveButtonDisabled,
    createButtonDisabled,
  };
};

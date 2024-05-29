import { useEffect, useState } from 'react';
import { isAddress } from 'viem';

import { CreateOfferState } from '@lib/constants';
import { useOfferContext } from '@/context/offer/offer-context';

export const useButtonsDisabled = () => {
  const { activeStep, offerFromState, offerToState } = useOfferContext();
  const [approveButtonDisabled, setApproveButtonDisabled] =
    useState<boolean>(true);
  const [createButtonDisabled, setCreateButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    const isOfferFromStateValid =
      offerFromState.from !== '' &&
      offerFromState.amount > 0 &&
      offerFromState.rate > 0;
    const isOfferToStateValid =
      offerToState.to !== '' && offerToState.amount > 0;
    const isReceiverValid =
      !offerToState.receiver || isAddress(offerToState.receiver);
    const isApproveValid =
      isOfferFromStateValid && isOfferToStateValid && isReceiverValid;
    const isCreateValid =
      isApproveValid && activeStep === CreateOfferState.Approved;

    setApproveButtonDisabled(!isApproveValid);
    setCreateButtonDisabled(!isCreateValid);
  }, [activeStep, offerFromState, offerToState]);

  return {
    approveButtonDisabled,
    createButtonDisabled,
  };
};

import { useMemo, useEffect, useState } from 'react';
import { isAddress } from 'viem';

import { OfferProgress } from '@berezka-dao/shared/components/ProgressBar';

import { useOfferCreateContext } from '../store';

export const useButtonsDisabled = () => {
  const { activeStep, offerFromState, offerToState } = useOfferCreateContext();
  const [approveButtonDisabled, setApproveButtonDisabled] = useState<boolean>(true);
  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);

  const isOfferFromStateValid = useMemo(() => {
    return (
      offerFromState.from &&
      !Number.isNaN(Number(offerFromState.amount)) &&
      Number(offerFromState.amount) > 0 &&
      Number(offerFromState.rate) > 0
    );
  }, [offerFromState.amount, offerFromState.from, offerFromState.rate]);

  const isOfferToStateValid = useMemo(() => {
    return offerToState.to && !Number.isNaN(Number(offerToState.amount)) && Number(offerToState.amount) > 0;
  }, [offerToState.amount, offerToState.to]);

  const isReceiverValid = useMemo(() => {
    return !offerToState.receiver || isAddress(offerToState.receiver);
  }, [offerToState.receiver]);

  const isApproveValid = useMemo(() => {
    return isOfferFromStateValid && isOfferToStateValid && isReceiverValid;
  }, [isOfferFromStateValid, isOfferToStateValid, isReceiverValid]);

  const isCreateValid = useMemo(() => {
    return isApproveValid && activeStep === OfferProgress.Approved;
  }, [activeStep, isApproveValid]);

  useEffect(() => {
    setApproveButtonDisabled(!isApproveValid);
    setCreateButtonDisabled(!isCreateValid);
  }, [isApproveValid, isCreateValid]);

  return {
    approveButtonDisabled,
    createButtonDisabled,
  };
};

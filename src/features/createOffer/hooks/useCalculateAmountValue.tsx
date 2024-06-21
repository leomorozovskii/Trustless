import { useCallback } from 'react';

import { useOfferCreateContext } from '../store';

export const useCalculateAmountValue = () => {
  const { offerFromState, offerToState, setOfferToState, setOfferFromState } = useOfferCreateContext();

  const calculateAmountToValue = useCallback(() => {
    if (
      Number.isNaN(Number(offerFromState.amount)) ||
      Number.isNaN(offerFromState.rate) ||
      Number(offerFromState.amount) === 0 ||
      Number(offerFromState.rate) === 0
    )
      return;

    if (offerFromState.amount && offerFromState.rate) {
      const newAmountTo = Number(offerFromState.amount) * Number(offerFromState.rate);
      if (newAmountTo !== Number(offerToState.amount) && !Number.isNaN(newAmountTo) && Number.isFinite(newAmountTo)) {
        setOfferToState({ amount: String(newAmountTo) });
      } else if (Number(offerFromState.rate) === 0 || Number(offerFromState.amount) === 0) {
        setOfferToState({ amount: '' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerFromState.rate, offerFromState.amount, setOfferToState]);

  const calculateRateValue = useCallback(() => {
    if (
      Number.isNaN(Number(offerToState.amount)) ||
      Number.isNaN(Number(offerFromState.amount)) ||
      Number(offerToState.amount) === 0 ||
      Number(offerFromState.amount) === 0
    )
      return;

    if (offerToState.amount && offerFromState.amount) {
      const newRate = Number(offerToState.amount) / Number(offerFromState.amount);
      if (newRate !== Number(offerFromState.rate) && !Number.isNaN(newRate) && Number.isFinite(newRate)) {
        setOfferFromState({ rate: newRate.toString() });
      } else if (Number(offerToState.amount) === 0 || Number(offerFromState.amount) === 0) {
        setOfferFromState({ rate: '0' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerToState.amount, setOfferFromState]);

  return {
    calculateAmountToValue,
    calculateRateValue,
  };
};

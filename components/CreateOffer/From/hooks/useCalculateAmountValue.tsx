import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

export const useCalculateAmountValue = () => {
  const { offerFromState, offerToState, setOfferToState, setOfferFromState } = useOfferCreateContext();

  const calculateAmountToValue = () => {
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
      } else if (offerFromState.rate === 0 || Number(offerFromState.amount) === 0) {
        setOfferToState({ amount: '' });
      }
    }
  };

  const calculateRateValue = () => {
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
        setOfferFromState({ rate: newRate });
      } else if (Number(offerToState.amount) === 0 || Number(offerFromState.amount) === 0) {
        setOfferFromState({ rate: 0 });
      }
    }
  };

  return {
    calculateAmountToValue,
    calculateRateValue,
  };
};

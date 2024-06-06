import React, { useEffect, useMemo } from 'react';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { checkValidAmount } from '@components/CreateOffer/Buttons/utils/utils';
import { useCalculateAmountValue } from '@components/CreateOffer/From/hooks/useCalculateAmountValue';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

import s from './OfferFrom.module.scss';

const OfferFrom = () => {
  const { setOfferFromState, offerFromState, offerToState, inputsDisabled, setIsFeeIncluded } = useOfferCreateContext();
  const { calculateRateValue } = useCalculateAmountValue();

  useEffect(() => {
    calculateRateValue();
  }, [offerToState.amount, offerFromState.amount]);

  const amountError = useMemo(() => {
    if (offerFromState.amount && !checkValidAmount(offerFromState.amount)) {
      return 'error';
    }
    if (offerFromState.amountError) {
      return offerFromState.amountError;
    }
    return '';
  }, [offerFromState.amount, offerFromState.amountError]);

  return (
    <div className={s.container}>
      <div className={s.selectContainer}>
        <h2 className={s.selectLabel}>From</h2>
        <Select
          value={offerFromState.from}
          placeholder="Select token"
          disabled={inputsDisabled}
          onChange={(value) => setOfferFromState({ from: value })}
        />
        <AddCustomToken type="from" />
      </div>
      <Input
        id="from amount input"
        label="Amount"
        type="text"
        error={amountError}
        disabled={inputsDisabled}
        size="lg"
        placeholder="0"
        value={offerFromState.amount ? offerFromState.amount.toString() : ''}
        onChange={({ target }) => {
          setOfferFromState({ amount: target.value });
          setIsFeeIncluded(false);
        }}
      />
      <Input
        id="from rate input"
        label="Rate"
        type="number"
        size="lg"
        placeholder="0"
        value={offerFromState.rate ? offerFromState.rate.toString() : ''}
        onChange={({ target }) => {
          setOfferFromState({ rate: Number(target.value) });
          setIsFeeIncluded(false);
        }}
      />
    </div>
  );
};

export default OfferFrom;

import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';

import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { checkValidAmount } from '@components/CreateOffer/Buttons/utils/utils';
import { useCalculateAmountValue } from '@components/CreateOffer/From/hooks/useCalculateAmountValue';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

import s from './OfferFrom.module.scss';

const OfferFrom = () => {
  const { setOfferFromState, offerFromState, offerToState, inputsDisabled } = useOfferCreateContext();
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
      <div className={cn(s.selectContainer, s.mb)}>
        <h2 className={s.selectLabel}>From</h2>
        <Select
          type="from"
          value={offerFromState.from}
          placeholder="Select token"
          disabled={inputsDisabled}
          onChange={(value) => setOfferFromState({ from: value })}
        />
      </div>
      <Input
        id="from amount input"
        label={
          <div className={s.amountContainer}>
            <p className={s.amountText}>Amount</p>
            <button className={s.amountButton}>Max</button>
          </div>
        }
        type="text"
        error={amountError}
        disabled={inputsDisabled}
        size="lg"
        placeholder="0"
        subtext={
          <div className={s.balanceContainer}>
            <p className={s.balanceLabel}>Balance</p>
            <p className={s.balanceValue}>105.0000</p>
          </div>
        }
        value={offerFromState.amount ? offerFromState.amount : ''}
        onChange={({ target }) => {
          setOfferFromState({ amount: target.value });
        }}
      />
      <Input
        id="from rate input"
        label="Rate"
        type="text"
        disabled={inputsDisabled}
        size="lg"
        placeholder="0"
        value={offerFromState.rate ? offerFromState.rate : ''}
        onChange={({ target }) => {
          setOfferFromState({ rate: target.value });
        }}
      />
    </div>
  );
};

export default OfferFrom;

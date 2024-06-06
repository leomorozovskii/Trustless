import React, { useEffect, useMemo } from 'react';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { checkValidAmount } from '@components/CreateOffer/Buttons/utils/utils';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

import s from './OfferFrom.module.scss';

const OfferFrom = () => {
  const { setOfferFromState, offerFromState, offerToState, inputsDisabled, setIsFeeIncluded } = useOfferCreateContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Number.isNaN(Number(offerToState.amount)) || Number.isNaN(Number(offerFromState.amount))) return;
      if (offerToState.amount && offerFromState.amount) {
        const newRate = Number(offerToState.amount) / Number(offerFromState.amount);
        if (offerFromState.rate !== newRate && !Number.isNaN(newRate) && Number.isFinite(newRate)) {
          setOfferFromState({ rate: newRate });
        }
      } else if (Number(offerToState.amount) === 0 || Number(offerFromState.amount) === 0) {
        setOfferFromState({ rate: 0 });
      }
    }, 250);

    return () => clearTimeout(timeout);
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
        disabled
        placeholder="0"
        value={offerFromState.rate ? offerFromState.rate.toString() : ''}
        onChange={({ target }) => setOfferFromState({ rate: +target.value })}
      />
    </div>
  );
};

export default OfferFrom;

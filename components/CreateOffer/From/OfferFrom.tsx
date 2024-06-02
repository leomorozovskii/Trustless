import React, { useEffect } from 'react';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { useOfferContext } from '@context/offer/OfferContext';

import { checkValidAmount } from '@components/CreateOffer/Bottom/utils/utils';

import s from './OfferFrom.module.scss';

const OfferFrom = () => {
  const { setOfferFromState, offerFromState, offerToState } = useOfferContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (offerToState.amount && offerFromState.amount) {
        const newRate = offerFromState.amount / offerToState.amount;
        if (offerFromState.rate !== newRate && !Number.isNaN(newRate) && Number.isFinite(newRate)) {
          setOfferFromState({ rate: newRate });
        }
      } else if (offerToState.amount === 0 || offerFromState.amount === 0) {
        setOfferFromState({ rate: 0 });
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [offerToState.amount, offerFromState.amount]);

  return (
    <div className={s.container}>
      <div className={s.selectContainer}>
        <h2 className={s.selectLabel}>From</h2>
        <Select
          value={offerFromState.from}
          placeholder="Select token"
          onChange={(value) => setOfferFromState({ from: value })}
        />
        <AddCustomToken type="from" />
      </div>
      <Input
        id="from amount input"
        label="Amount"
        type="number"
        error={
          offerFromState.amount && !checkValidAmount(offerFromState.amount)
            ? 'error'
            : offerFromState.amountError
              ? offerFromState.amountError
              : ''
        }
        size="lg"
        placeholder="0"
        value={offerFromState.amount ? offerFromState.amount.toString() : ''}
        onChange={({ target }) => setOfferFromState({ amount: +target.value })}
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

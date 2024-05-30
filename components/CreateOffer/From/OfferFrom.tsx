import React from 'react';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { useOfferContext } from '@/context/offer/offer-context';

import s from './OfferFrom.module.scss';

const OfferFrom = () => {
  const { setOfferFromState, offerFromState } = useOfferContext();

  return (
    <div className={s.container}>
      <div className={s.selectContainer}>
        <h2 className={s.selectLabel}>From</h2>
        <Select
          value={offerFromState.from}
          placeholder="Select token"
          onChange={(value) => setOfferFromState({ from: value })}
        />
        <AddCustomToken />
      </div>
      <Input
        id="from amount input"
        label="Amount"
        type="number"
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
        placeholder="0"
        value={offerFromState.rate ? offerFromState.rate.toString() : ''}
        onChange={({ target }) => setOfferFromState({ rate: +target.value })}
      />
    </div>
  );
};

export default OfferFrom;

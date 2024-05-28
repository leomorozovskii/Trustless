import React from 'react';
import s from './OfferFrom.module.scss';
import { Select } from '@components/Select';
import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { useOfferContext } from '@src/context/offer/offer-context';

const OfferFrom = () => {
  const { setOfferFromState, offerFromState } = useOfferContext();

  return (
    <div className={s.container}>
      <div className={s.selectContainer}>
        <h2 className={s.selectLabel}>From</h2>
        <Select
          value={offerFromState.from}
          placeholder={'Select token'}
          onChange={(value) => setOfferFromState({ from: value })}
        />
        <AddCustomToken />
      </div>
      <Input
        id={'from amount input'}
        label={'Amount'}
        type={'number'}
        size={'lg'}
        placeholder={'0'}
        value={offerFromState.amount ? offerFromState.amount.toString() : ''}
        onChange={({ target }) => setOfferFromState({ amount: +target.value })}
      />
      <Input
        id={'from rate input'}
        label={'Rate'}
        type={'number'}
        size={'lg'}
        placeholder={'0'}
        value={offerFromState.rate ? offerFromState.rate.toString() : ''}
        onChange={({ target }) => setOfferFromState({ rate: +target.value })}
      />
    </div>
  );
};

export default OfferFrom;

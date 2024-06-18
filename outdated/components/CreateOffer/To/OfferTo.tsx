import React, { useEffect } from 'react';
import { isAddress } from 'viem';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { checkValidAmount } from '@components/CreateOffer/Buttons/utils/utils';
import { useCalculateAmountValue } from '@components/CreateOffer/From/hooks/useCalculateAmountValue';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';

import s from '@/components/CreateOffer/From/OfferFrom.module.scss';

const OfferTo = () => {
  const { setOfferToState, offerToState, offerFromState, inputsDisabled } = useOfferCreateContext();
  const { t } = useTranslation();
  const { calculateAmountToValue } = useCalculateAmountValue();

  useEffect(() => {
    const timeout = setTimeout(() => {
      calculateAmountToValue();
    }, 300);

    return () => clearTimeout(timeout);
  }, [offerFromState.rate, offerFromState.amount]);

  useEffect(() => {
    calculateAmountToValue();
  }, [offerFromState.amount]);

  return (
    <div className={s.container}>
      <div className={cn(s.selectContainer, s.inputWrapper)}>
        <h2 className={s.selectLabel}>{t('token.to')}</h2>
        <Select
          value={offerToState.to}
          placeholder="Select token"
          disabled={inputsDisabled}
          onChange={(value) => setOfferToState({ to: value })}
        />
        <AddCustomToken type="to" />
      </div>
      <Input
        id="to amount input"
        label={t('token.amount')}
        type="text"
        error={offerToState.amount && !checkValidAmount(offerToState.amount) ? 'error' : ''}
        size="lg"
        disabled={inputsDisabled}
        placeholder="0"
        classWrapper={cn(s.inputWrapper, s.mb, s.gap)}
        value={offerToState.amount ? offerToState.amount.toString() : ''}
        onChange={({ target }) => {
          setOfferToState({ amount: target.value });
        }}
      />
      <Input
        id="to receiver input"
        label={t('token.receiver')}
        type="text"
        size="lg"
        classInput={s.receiverInput}
        disabled={inputsDisabled}
        placeholder="0x0000000000000000000000000000000000000000"
        error={offerToState.receiver && !isAddress(offerToState.receiver) ? t('token.invalid.address') : ''}
        value={offerToState.receiver ? offerToState.receiver : ''}
        onChange={({ target }) => setOfferToState({ receiver: target.value })}
      />
    </div>
  );
};

export default OfferTo;

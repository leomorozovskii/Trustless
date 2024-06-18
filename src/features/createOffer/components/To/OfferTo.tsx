import cn from 'classnames';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isAddress } from 'viem';

import { AddCustomToken } from '@berezka-dao/features/createOffer/components/AddCustomToken';
import { checkValidAmount } from '@berezka-dao/features/createOffer/components/Buttons/utils';
import { useCalculateAmountValue } from '@berezka-dao/features/createOffer/components/From/hooks/useCalculateAmountValue';
import s from '@berezka-dao/features/createOffer/components/From/OfferFrom.module.scss';
import { Select } from '@berezka-dao/features/createOffer/components/Select';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { Input } from '@berezka-dao/shared/ui-kit/Input';

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
        onChange={({ currentTarget }) => {
          setOfferToState({ amount: currentTarget.value });
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
        onChange={({ currentTarget }) => setOfferToState({ receiver: currentTarget.value })}
      />
    </div>
  );
};

export { OfferTo };

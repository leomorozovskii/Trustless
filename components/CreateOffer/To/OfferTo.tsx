import React, { useEffect } from 'react';
import { getAddress, isAddress } from 'viem';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import cn from 'classnames';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { checkValidAmount } from '@components/CreateOffer/Buttons/utils/utils';

import s from '@/components/CreateOffer/From/OfferFrom.module.scss';

const OfferTo = () => {
  const searchParams = useSearchParams();
  const { setOfferToState, setOfferFromState, offerToState, inputsDisabled } = useOfferCreateContext();
  const { t } = useTranslation();

  useEffect(() => {
    const tokenToParam = searchParams.get('tokenTo');
    const amountToParam = searchParams.get('amountTo');
    const receiverParam = searchParams.get('receiver');
    const tokenFromParam = searchParams.get('tokenFrom');
    const amountFromParam = searchParams.get('amountFrom');

    let validatedTokenFrom = '';
    let validatedTokenTo = '';
    let validatedReceiver = '';

    if (tokenFromParam) {
      try {
        validatedTokenFrom = getAddress(tokenFromParam);
      } catch (error) {
        validatedTokenFrom = '';
      }
    }

    if (tokenToParam) {
      try {
        validatedTokenTo = getAddress(tokenToParam);
      } catch (error) {
        validatedTokenTo = '';
      }
    }

    if (receiverParam) {
      try {
        validatedReceiver = getAddress(receiverParam);
      } catch (error) {
        validatedReceiver = '';
      }
    }

    setOfferFromState({
      from: validatedTokenFrom,
      amount: amountFromParam || '',
      rate: 0,
    });

    setOfferToState({
      to: validatedTokenTo,
      amount: amountToParam || '',
      receiver: validatedReceiver,
    });
  }, []);

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
        classWrapper={s.inputWrapper}
        value={offerToState.amount ? offerToState.amount.toString() : ''}
        onChange={({ target }) => setOfferToState({ amount: target.value })}
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

import React from 'react';
import s from '../From/OfferFrom.module.scss';
import { Select } from '@components/Select';
import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import cn from 'classnames';
import { isAddress } from 'viem';
import { useTranslation } from 'react-i18next';
import { useOfferContext } from '@src/context/offer/offer-context';

const OfferTo = () => {
  const { setOfferToState, offerToState } = useOfferContext();
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <div className={cn(s.selectContainer, s.inputWrapper)}>
        <h2 className={s.selectLabel}>{t('token.to')}</h2>
        <Select
          value={offerToState.to}
          placeholder={'Select token'}
          onChange={(value) => setOfferToState({ to: value })}
        />
        <AddCustomToken />
      </div>
      <Input
        id={'to amount input'}
        label={t('token.amount')}
        type={'number'}
        size={'lg'}
        placeholder={'0'}
        classWrapper={s.inputWrapper}
        value={offerToState.amount ? offerToState.amount.toString() : ''}
        onChange={({ target }) => setOfferToState({ amount: +target.value })}
      />
      <Input
        id={'to receiver input'}
        label={t('token.receiver')}
        type={'text'}
        size={'lg'}
        placeholder={'0x0000000000000000000000000000'}
        error={
          offerToState.receiver && !isAddress(offerToState.receiver)
            ? t('token.invalid.address')
            : ''
        }
        value={offerToState.receiver ? offerToState.receiver : ''}
        onChange={({ target }) => setOfferToState({ receiver: target.value })}
      />
    </div>
  );
};

export default OfferTo;

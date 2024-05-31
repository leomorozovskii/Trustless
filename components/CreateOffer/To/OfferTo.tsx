import React, { useEffect } from 'react';
import { isAddress } from 'viem';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { AddCustomToken } from '@components/AddCustomToken';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { useOfferContext } from '@/context/offer/offer-context';
import s from '@/components/CreateOffer/From/OfferFrom.module.scss';
import { checkValidAmount } from '@components/CreateOffer/Bottom/utils/utils';

const OfferTo = () => {
  const { setOfferToState, offerToState, offerFromState } = useOfferContext();
  const { t } = useTranslation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (offerFromState.rate && offerFromState.amount) {
        const newAmount = offerFromState.amount / offerFromState.rate;
        if (offerToState.amount !== newAmount && !Number.isNaN(newAmount) && Number.isFinite(newAmount)) {
          setOfferToState({ amount: newAmount });
        }
      } else if (offerFromState.rate === 0 || offerFromState.amount === 0) {
        setOfferToState({ amount: 0 });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [offerFromState.rate, offerFromState.amount]);

  return (
    <div className={s.container}>
      <div className={cn(s.selectContainer, s.inputWrapper)}>
        <h2 className={s.selectLabel}>{t('token.to')}</h2>
        <Select
          value={offerToState.to}
          placeholder="Select token"
          onChange={(value) => setOfferToState({ to: value })}
        />
        <AddCustomToken />
      </div>
      <Input
        id="to amount input"
        label={t('token.amount')}
        type="number"
        error={offerToState.amount && !checkValidAmount(offerToState.amount) ? 'error' : ''}
        size="lg"
        placeholder="0"
        classWrapper={s.inputWrapper}
        value={offerToState.amount ? offerToState.amount.toString() : ''}
        onChange={({ target }) => setOfferToState({ amount: +target.value })}
      />
      <Input
        id="to receiver input"
        label={t('token.receiver')}
        type="text"
        size="lg"
        placeholder="0x0000000000000000000000000000000000000000"
        error={offerToState.receiver && !isAddress(offerToState.receiver) ? t('token.invalid.address') : ''}
        value={offerToState.receiver ? offerToState.receiver : ''}
        onChange={({ target }) => setOfferToState({ receiver: target.value })}
      />
    </div>
  );
};

export default OfferTo;

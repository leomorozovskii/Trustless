import cn from 'classnames';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAddress, isAddress } from 'viem';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { checkValidAmount } from '@berezka-dao/features/createOffer';
import { useCalculateAmountValue } from '@berezka-dao/features/createOffer/hooks';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { Input } from '@berezka-dao/shared/ui-kit/Input';

import { AddCustomToken } from '../AddCustomToken';
import s from '../OfferFrom/OfferFrom.module.scss';
import { Select } from '../Select';

const OfferTo = () => {
  const { setOfferToState, offerToState, offerFromState, inputsDisabled } = useOfferCreateContext();
  const { t } = useTranslation();
  const { calculateAmountToValue } = useCalculateAmountValue();

  useEffect(() => {
    const timeout = setTimeout(() => {
      calculateAmountToValue();
    }, 300);

    return () => clearTimeout(timeout);
  }, [offerFromState.rate, offerFromState.amount, calculateAmountToValue]);

  return (
    <div className={s.container}>
      <div className={cn(s.selectContainer, s.inputWrapper)}>
        <h2 className={s.selectLabel}>{t('token.to')}</h2>
        <Select
          tokens={Object.values(TOKEN_MAP)}
          placeholder="Select token"
          value={offerToState.to}
          customTokenName={offerToState.customTokenName}
          disabled={inputsDisabled}
          onSelect={(value, decimals) => setOfferToState({ to: getAddress(value), decimals })}
        />
        <AddCustomToken
          onProceed={(decimal, address, symbol) =>
            setOfferToState({ to: address, decimals: decimal, customTokenName: symbol })
          }
        />
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

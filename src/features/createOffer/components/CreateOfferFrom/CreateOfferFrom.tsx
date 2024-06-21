import { useEffect, useMemo } from 'react';
import { getAddress } from 'viem';

import { Input } from '@berezka-dao/shared/ui-kit/Input';

import s from './CreateOfferFrom.module.scss';
import { useCalculateAmountValue } from '../../hooks';
import { useOfferCreateContext } from '../../store';
import { checkValidAmount } from '../../utils';
import { AddCustomToken } from '../AddCustomToken';
import { Select } from '../Select';

const CreateOfferFrom = () => {
  const { setOfferFromState, offerFromState, offerToState, inputsDisabled, userTokens } = useOfferCreateContext();
  const { calculateRateValue } = useCalculateAmountValue();

  useEffect(() => {
    calculateRateValue();
  }, [offerToState.amount, calculateRateValue]);

  const amountError = useMemo(() => {
    if (offerFromState.amount && !checkValidAmount(offerFromState.amount)) {
      return 'error';
    }
    if (offerFromState.amountError) {
      return offerFromState.amountError;
    }
    return '';
  }, [offerFromState.amount, offerFromState.amountError]);

  const maxBalance = useMemo(() => {
    if (!offerFromState.from || !userTokens.tokens) return '0';
    const currentToken = userTokens.tokens.find((token) => token.address === offerFromState.from);
    if (!currentToken) return '0';
    return currentToken.balance;
  }, [offerFromState.from, userTokens]);

  const handleSetMaxBalance = () => {
    if (!offerFromState.from) return;
    setOfferFromState({ amountError: '' });
    setOfferFromState({ amount: maxBalance });
  };

  return (
    <div className={s.container}>
      <div className={s.selectContainer}>
        <h2 className={s.selectLabel}>From</h2>
        <Select
          tokens={userTokens.tokens}
          placeholder="Select token"
          value={offerFromState.from}
          customTokenName={offerFromState.customTokenName}
          disabled={inputsDisabled}
          onSelect={(value, decimals) => setOfferFromState({ from: getAddress(value), decimals })}
        />
        <AddCustomToken
          onProceed={(decimal, address, symbol) =>
            setOfferFromState({ from: address, decimals: decimal, customTokenName: symbol })
          }
        />
      </div>
      <Input
        id="from amount input"
        label={
          <div className={s.amountContainer}>
            <p className={s.amountText}>Amount</p>
            <button disabled={inputsDisabled} onClick={handleSetMaxBalance} className={s.amountButton}>
              Max
            </button>
          </div>
        }
        type="text"
        error={amountError}
        disabled={inputsDisabled}
        size="lg"
        placeholder="0"
        subtext={
          <div className={s.balanceContainer}>
            <p className={s.balanceLabel}>Balance</p>
            <p className={s.balanceValue}>{maxBalance}</p>
          </div>
        }
        value={offerFromState.amount ? offerFromState.amount : ''}
        onChange={({ currentTarget }) => {
          setOfferFromState({ amount: currentTarget.value, amountError: '' });
        }}
      />
      <Input
        id="from rate input"
        label="Rate"
        type="text"
        disabled={inputsDisabled}
        size="lg"
        placeholder="0"
        value={offerFromState.rate ? offerFromState.rate : ''}
        onChange={({ currentTarget }) => {
          setOfferFromState({ rate: currentTarget.value });
        }}
      />
    </div>
  );
};

export { CreateOfferFrom };

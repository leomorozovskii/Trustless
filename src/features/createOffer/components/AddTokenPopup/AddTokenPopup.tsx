import type { FC, FormEvent } from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAddress, isAddress } from 'viem';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { useClickOutside } from '@berezka-dao/shared/hooks/useClickOutside';
import { useTokenInfo } from '@berezka-dao/shared/hooks/useTokenInfo';
import { InputCross, WarningIcon } from '@berezka-dao/shared/icons';
import { Button } from '@berezka-dao/shared/ui-kit/Button';
import { Input } from '@berezka-dao/shared/ui-kit/Input';

import s from './AddTokenPopup.module.scss';

type AddTokenPopupState = {
  symbol?: string;
  decimal: number;
  address?: Address;
};

type Props = {
  onClose(): void;
  onProceed(decimals: number, address?: Address, symbol?: string): void;
};

const AddTokenPopup: FC<Props> = ({ onClose, onProceed }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const [isInvalidAddress, setIsInvalidAddress] = useState<boolean>(false);
  const [localAddress, setLocalAddress] = useState<string>('');
  const { address: userAddress } = useAccount();

  const ref = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState<number>(1);
  const [tokenState, setTokenState] = useReducer(
    (oldState: AddTokenPopupState, newState: Partial<AddTokenPopupState>): AddTokenPopupState => ({
      ...oldState,
      ...newState,
    }),
    {
      decimal: 0,
    },
  );

  const { TokenLogo, tokenName, tokenDecimals, tokenDisplayBalance } = useTokenInfo({
    address: tokenState.address,
    userAddress,
  });

  useEffect(() => {
    if (tokenName && tokenDecimals) {
      setTokenState({ symbol: tokenName });
      setTokenState({ decimal: tokenDecimals });
    } else {
      setTokenState({ symbol: undefined });
      setTokenState({ decimal: 0 });
    }
  }, [tokenDecimals, tokenName]);

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      onProceed(tokenState.decimal, tokenState.address, tokenState.symbol);
      onClose();
      handleAddItem({
        title: t('offer.create.tokenImported'),
        text: `${t('offer.create.successfullyImported')} ${tokenState.symbol}.`,
        type: 'success',
      });
    }
  };

  useClickOutside(ref, (ev) => {
    if (!ref.current?.contains(ev.target as Node)) {
      onClose();
    }
  });

  const changeAddressHandler = (value: string) => {
    setLocalAddress(value);
    if (isAddress(value)) {
      setTokenState({ address: getAddress(value) });
      setIsInvalidAddress(false);
    } else {
      setTokenState({ address: undefined });
      setIsInvalidAddress(true);
    }
  };

  return (
    <form onSubmit={handleAdd} className={s.wrapper}>
      <div className={s.container} ref={ref}>
        <div className={s.content}>
          <div className={s.titleContainer}>
            <h2 className={s.title}>{t('offer.create.addToken')}</h2>
            <InputCross onClick={onClose} className={s.cross} />
          </div>
          <div className={s.warnContainer}>
            <div className={s.warning}>
              <WarningIcon width={32} height={32} />
            </div>
            <p className={s.warnText}>{t('offer.warn.addToken')}</p>
          </div>
          {step === 1 ? (
            <>
              <Input
                label={t('token.address')}
                size="lg"
                id="token address input"
                classInput={s.addressInput}
                error={
                  (tokenState.address && !isAddress(tokenState.address)) || isInvalidAddress
                    ? t('token.invalid.address')
                    : ''
                }
                value={localAddress}
                onChange={({ currentTarget }) => changeAddressHandler(currentTarget.value)}
              />
              <Input
                label={t('token.name')}
                size="lg"
                disabled
                id="token name input"
                value={tokenState.symbol || ''}
                onChange={({ currentTarget }) => setTokenState({ symbol: currentTarget.value })}
              />
              <Input
                label={t('token.decimal')}
                size="lg"
                disabled
                classWrapper={s.decimalWrapper}
                id="token decimal input"
                value={tokenState.decimal ? tokenState.decimal.toString() : ''}
                onChange={({ currentTarget }) => setTokenState({ decimal: Number(currentTarget.value) })}
              />
            </>
          ) : (
            <div className={s.tokenWrapper}>
              <div className={s.tokenContainer}>
                <TokenLogo className={s.tokenLogo} />
                <div className={s.balanceContainer}>
                  <h2 className={s.tokenTitle}>{tokenState.symbol}</h2>
                  <h2 className={s.tokenBalance}>
                    {tokenDisplayBalance} {tokenState.symbol}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={s.buttonContainer}>
          <Button type="button" onClick={() => (step === 1 ? onClose() : setStep(1))}>
            {t('token.add.back')}
          </Button>
          <Button type="submit" disabled={!tokenState.address || !tokenState.symbol || !tokenState.decimal}>
            {t('token.add.import')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export { AddTokenPopup };

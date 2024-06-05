import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useBalance, useToken } from 'wagmi';
import { Address, getAddress, isAddress } from 'viem';

import { InputCross, WarningIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { TOKEN_MAP, TokenAddress } from '@lib/constants';
import { useClickOutside } from '@lib/hooks/useClickOutside';

import s from './AddTokenPopup.module.scss';

export interface IAddTokenPopupState {
  address: string;
  name: string;
  decimal: number;
}

interface IAddTokenPopup {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'from' | 'to';
}

const AddTokenPopup: React.FC<IAddTokenPopup> = ({ setOpened, type }) => {
  const { t } = useTranslation();
  const { setOfferFromState, setOfferToState, setCustomTokenName } = useOfferCreateContext();
  const { address: userAddress } = useAccount();

  const ref = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState<number>(1);
  const [tokenState, setTokenState] = useReducer(
    (oldState: IAddTokenPopupState, newState: Partial<IAddTokenPopupState>): IAddTokenPopupState => ({
      ...oldState,
      ...newState,
    }),
    {
      address: '',
      name: '',
      decimal: 0,
    },
  );

  const result = useToken({
    address: tokenState.address as Address,
  });

  const token = useMemo(() => {
    if (!tokenState.address) return TOKEN_MAP[TokenAddress.UNKNOWN];
    const data = TOKEN_MAP[tokenState.address];
    return data || TOKEN_MAP[TokenAddress.UNKNOWN];
  }, [tokenState.address]);

  const { data: balance } = useBalance({
    address: userAddress,
    token: tokenState.address as Address,
  });

  useEffect(() => {
    if (result.data) {
      setTokenState({ name: result.data.symbol });
      setTokenState({ decimal: result.data.decimals });
    } else {
      setTokenState({ name: '' });
      setTokenState({ decimal: 0 });
    }
  }, [result.data]);

  const stepHandler = () => {
    if (type === 'to') {
      setOfferToState({ to: tokenState.address, decimals: tokenState.decimal });
      setCustomTokenName(tokenState.name);
    } else if (type === 'from') {
      setOfferFromState({ from: tokenState.address, decimals: tokenState.decimal });
      setCustomTokenName(tokenState.name);
    }
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      stepHandler();
      setOpened(false);
    }
  };

  useClickOutside(ref, (ev) => {
    if (!ref.current?.contains(ev.target as Node)) {
      setOpened(false);
    }
  });

  return (
    <form onSubmit={handleAdd} className={s.wrapper}>
      <div className={s.container} ref={ref}>
        <div className={s.titleContainer}>
          <h2 className={s.title}>{t('offer.create.addToken')}</h2>
          <InputCross onClick={() => setOpened(false)} className={s.cross} />
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
              error={tokenState.address && !isAddress(tokenState.address) ? t('token.invalid.address') : ''}
              value={tokenState.address}
              onChange={({ target }) => setTokenState({ address: target.value ? getAddress(target.value) : '' })}
            />
            <Input
              label={t('token.name')}
              size="lg"
              disabled
              id="token name input"
              value={tokenState.name}
              onChange={({ target }) => setTokenState({ name: target.value })}
            />
            <Input
              label={t('token.decimal')}
              size="lg"
              disabled
              classWrapper={s.decimalWrapper}
              id="token decimal input"
              value={tokenState.decimal ? tokenState.decimal.toString() : ''}
              onChange={({ target }) => setTokenState({ decimal: +target.value })}
            />
          </>
        ) : (
          <div className={s.tokenWrapper}>
            <div className={s.tokenContainer}>
              <token.logo className={s.tokenLogo} />
              <div className={s.balanceContainer}>
                <h2 className={s.tokenTitle}>{tokenState.name}</h2>
                <h2 className={s.tokenBalance}>
                  {balance?.formatted} {tokenState.name}
                </h2>
              </div>
            </div>
          </div>
        )}
        <div className={s.buttonContainer}>
          <Button type="button" onClick={() => (step === 1 ? setOpened(false) : setStep(1))}>
            {t('token.add.back')}
          </Button>
          <Button type="submit" disabled={!tokenState.address || !tokenState.name || !tokenState.decimal}>
            {t('token.add.import')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTokenPopup;

import type { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { erc20Abi, formatUnits, getAddress, isAddress } from 'viem';
import type { Address } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { useClickOutside } from '@berezka-dao/shared/hooks/useClickOutside';
import { InputCross, WarningIcon } from '@berezka-dao/shared/icons';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';
import { Button } from '@berezka-dao/shared/ui-kit/Button';
import { Input } from '@berezka-dao/shared/ui-kit/Input';

import s from './AddTokenPopup.module.scss';

interface IAddTokenPopupState {
  name: string;
  decimal: number;
  address?: Address;
}

type Props = {
  type: 'from' | 'to';
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const AddTokenPopup: FC<Props> = ({ setOpened, type }) => {
  const { t } = useTranslation();
  const [isInvalidAddress, setIsInvalidAddress] = useState<boolean>(false);
  const [localAddress, setLocalAddress] = useState<string>('');
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
      name: '',
      decimal: 0,
    },
  );

  const { data: [decimals, symbol, balanceOf] = [] } = useReadContracts(
    userAddress && {
      allowFailure: false,
      contracts: [
        {
          address: tokenState.address,
          abi: erc20Abi,
          functionName: 'decimals',
        },
        {
          address: tokenState.address,
          abi: erc20Abi,
          functionName: 'symbol',
        },
        {
          address: tokenState.address,
          abi: erc20Abi,
          functionName: 'balanceOf',
          args: [userAddress],
        },
      ],
    },
  );

  const balance = useMemo(() => {
    if (!balanceOf || !decimals) return '0';
    return formatUnits(balanceOf, decimals);
  }, [balanceOf, decimals]);

  const TokenLogo = useMemo(() => {
    if (!tokenState.address) return UnknownIcon;
    const data = TOKEN_MAP[tokenState.address];
    if (!data) return UnknownIcon;
    return data.logo;
  }, [tokenState.address]);

  useEffect(() => {
    if (symbol && decimals) {
      setTokenState({ name: symbol });
      setTokenState({ decimal: decimals });
    } else {
      setTokenState({ name: '' });
      setTokenState({ decimal: 0 });
    }
  }, [decimals, symbol]);

  const stepHandler = () => {
    if (type === 'to') {
      setOfferToState({ to: tokenState.address, decimals: tokenState.decimal });
      setCustomTokenName(tokenState.name);
    } else if (type === 'from') {
      setOfferFromState({ from: tokenState.address, decimals: tokenState.decimal });
      setCustomTokenName(tokenState.name);
    }
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
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
                classInput={s.addressInput}
                error={
                  (tokenState.address && !isAddress(tokenState.address)) || isInvalidAddress
                    ? t('token.invalid.address')
                    : ''
                }
                value={localAddress}
                onChange={({ target }) => changeAddressHandler(target.value)}
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
                onChange={({ target }) => setTokenState({ decimal: Number(target.value) })}
              />
            </>
          ) : (
            <div className={s.tokenWrapper}>
              <div className={s.tokenContainer}>
                <TokenLogo className={s.tokenLogo} />
                <div className={s.balanceContainer}>
                  <h2 className={s.tokenTitle}>{tokenState.name}</h2>
                  <h2 className={s.tokenBalance}>
                    {balance} {tokenState.name}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
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

export { AddTokenPopup };

import React, { memo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { isAddress } from 'viem';

import { InputCross, WarningIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import s from './AddTokenPopup.module.scss';

export interface IAddTokenPopupState {
  address: string;
  name: string;
  decimal: number;
}

interface IAddTokenPopup {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTokenPopup: React.FC<IAddTokenPopup> = ({ setOpened }) => {
  const { t } = useTranslation();
  const [tokenState, setTokenState] = useReducer(
    (
      oldState: IAddTokenPopupState,
      newState: Partial<IAddTokenPopupState>,
    ): IAddTokenPopupState => ({
      ...oldState,
      ...newState,
    }),
    {
      address: '',
      name: '',
      decimal: 18,
    },
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  TODO logic here
  };

  return (
    <form onSubmit={handleAdd} className={s.wrapper}>
      <div className={s.container}>
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
        <Input
          label={t('token.address')}
          size="lg"
          id="token address input"
          error={
            tokenState.address && !isAddress(tokenState.address)
              ? t('token.invalid.address')
              : ''
          }
          value={tokenState.address}
          onChange={({ target }) => setTokenState({ address: target.value })}
        />
        <Input
          label={t('token.name')}
          size="lg"
          id="token name input"
          value={tokenState.name}
          onChange={({ target }) => setTokenState({ name: target.value })}
        />
        <Input
          label={t('token.decimal')}
          size="lg"
          classWrapper={s.decimalWrapper}
          id="token decimal input"
          value={tokenState.decimal ? tokenState.decimal.toString() : ''}
          onChange={({ target }) => setTokenState({ decimal: +target.value })}
        />
        <div className={s.buttonContainer}>
          <Button type="button" onClick={() => setOpened(false)}>
            {t('token.add.back')}
          </Button>
          <Button type="submit">{t('token.add.import')}</Button>
        </div>
      </div>
    </form>
  );
};

export default memo(AddTokenPopup);

import React, { useMemo, useState } from 'react';
import { useToken } from 'wagmi';
import { Address } from 'viem';
import cn from 'classnames';

import { SelectIcon } from '@assets/icons';
import { IconProps, UnknownIcon } from '@assets/icons/tokens';
import { SelectTokenPopup } from '@components/SelectTokenPopup';
import { useOfferCreateContext } from '@context/offer/create/OfferCreateContext';
import { TOKEN_MAP } from '@lib/constants';

import s from './Select.module.scss';

export interface ISelect {
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  type?: 'from' | 'to' | 'default';
}

const Select: React.FC<ISelect> = ({ placeholder, value, onChange, disabled, type = 'default' }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { customTokenName } = useOfferCreateContext();
  const { userTokens: tokens } = useOfferCreateContext();

  const handleSelectToken = (tokenAddress: string) => {
    onChange(tokenAddress);
    setOpened(false);
  };

  const result = useToken({
    address: value as Address,
  });

  const IconComponent: React.FC<IconProps> | undefined = useMemo(() => {
    if (!value) return;
    const item = TOKEN_MAP[value as Address];
    if (type === 'from' && tokens && item) return item.logo;
    if (!item) return UnknownIcon;
    return item.logo;
  }, [value, tokens, type]);

  const tokenTitle = useMemo(() => {
    if (!value) return;
    const walletToken = tokens.find((el) => el.address === value)?.symbol;
    if (type === 'from' && value && walletToken) return walletToken;
    const notImported = TOKEN_MAP[value as Address]?.name;
    if (!notImported && !result.data) return customTokenName;
    if (!notImported && result.data) return result.data.symbol;
    return TOKEN_MAP[value as Address].name;
  }, [value, tokens, type, result.data, customTokenName]);

  const handleOpen = () => {
    if (disabled) return;
    setOpened(true);
  };

  return (
    <div className={s.wrapper}>
      <button onClick={handleOpen} className={cn(s.trigger, disabled && s.disabled)}>
        <div>
          {value ? (
            <div className={s.selectedItem}>
              {IconComponent && <IconComponent width={20} height={20} />}
              {tokenTitle}
            </div>
          ) : (
            placeholder
          )}
        </div>
        <SelectIcon />
      </button>
      {opened && <SelectTokenPopup setOpened={setOpened} type={type} handleSelectToken={handleSelectToken} />}
    </div>
  );
};

export default Select;

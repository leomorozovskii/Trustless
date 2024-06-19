// TODO :: remove deprecated import
/* eslint-disable import/no-deprecated */
import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useMemo, useState } from 'react';
import type { Address } from 'viem';
import { useToken } from 'wagmi';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import { SelectTokenPopup } from '@berezka-dao/features/createOffer/components/SelectTokenPopup';
import { useOfferCreateContext } from '@berezka-dao/features/createOffer/store';
import { SelectIcon } from '@berezka-dao/shared/icons';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

import s from './Select.module.scss';

interface ISelect {
  value?: Address;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  type?: 'from' | 'to' | 'default';
}

const Select: React.FC<ISelect> = ({ placeholder, value, onChange, disabled, type = 'default' }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { customTokenName } = useOfferCreateContext();
  const { userTokens } = useOfferCreateContext();

  const handleSelectToken = (tokenAddress: string) => {
    onChange(tokenAddress);
    setOpened(false);
  };

  const result = useToken({
    address: value,
  });

  const IconComponent: FC<ComponentProps<typeof UnknownIcon>> | undefined = useMemo(() => {
    if (!value) return;
    const item = TOKEN_MAP[value];
    if (type === 'from' && userTokens.tokens && item) return item.logo;
    if (!item) return UnknownIcon;
    return item.logo;
  }, [value, userTokens.tokens, type]);

  const tokenTitle = useMemo(() => {
    if (!value) return;
    const walletToken = userTokens.tokens?.find((el) => el.address === value)?.symbol;
    if (type === 'from' && value && walletToken) return walletToken;
    const notImported = TOKEN_MAP[value]?.name;
    if (!notImported && !result.data) return customTokenName;
    if (!notImported && result.data) return result.data.symbol;
    return TOKEN_MAP[value].name;
  }, [value, userTokens.tokens, type, result.data, customTokenName]);

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

export { Select };

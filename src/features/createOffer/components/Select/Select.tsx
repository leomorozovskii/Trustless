import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useMemo, useState } from 'react';
import type { Address } from 'viem';

import { TOKEN_MAP } from '@berezka-dao/core/constants';
import type { TokenData } from '@berezka-dao/core/types';
import { SelectTokenPopup } from '@berezka-dao/features/createOffer/components/SelectTokenPopup';
import type { Token } from '@berezka-dao/features/createOffer/types';
import { SelectIcon } from '@berezka-dao/shared/icons';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

import s from './Select.module.scss';

type Props = {
  tokens: Token[] | TokenData[] | null;
  placeholder: string;
  disabled?: boolean;
  isLoading?: boolean;
  value?: Address;
  customTokenName?: string;
  onSelect(value: string, decimals: number): void;
};

const Select: FC<Props> = ({ isLoading, value, placeholder, disabled, tokens, onSelect, customTokenName }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handleSelectToken = (tokenAddress: string, decimals: number) => {
    onSelect(tokenAddress, decimals);
    setOpened(false);
  };

  const IconComponent: FC<ComponentProps<typeof UnknownIcon>> | undefined = useMemo(() => {
    if (!value) return;
    const item = TOKEN_MAP[value];
    if (!item) return UnknownIcon;
    return item.logo;
  }, [value]);

  const tokenTitle = useMemo(() => {
    if (!value) return;
    const walletToken = tokens?.find((el) => el.address === value)?.symbol;
    if (walletToken) return walletToken;
    const notImported = TOKEN_MAP[value]?.symbol;
    if (!notImported) return customTokenName;
    return TOKEN_MAP[value].symbol;
  }, [value, tokens, customTokenName]);

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
      {opened && (
        <SelectTokenPopup
          isLoading={isLoading}
          tokens={tokens}
          onClose={() => setOpened(false)}
          onSelect={handleSelectToken}
        />
      )}
    </div>
  );
};

export { Select };

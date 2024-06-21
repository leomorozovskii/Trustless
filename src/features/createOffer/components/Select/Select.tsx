import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useMemo, useState } from 'react';
import type { Address } from 'viem';
import { useReadContract } from 'wagmi';

import { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';
import { TOKEN_MAP } from '@berezka-dao/core/constants';
import type { TokenData } from '@berezka-dao/core/types';
import { SelectIcon } from '@berezka-dao/shared/icons';
import { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

import s from './Select.module.scss';
import type { Token } from '../../types';
import { SelectTokenPopup } from '../SelectTokenPopup';

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

  const { data: symbol } = useReadContract({
    address: value,
    abi: customErc20Abi,
    functionName: 'symbol',
  });

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
    if (!notImported && !symbol) return customTokenName;
    if (!notImported && symbol) return symbol;
    return TOKEN_MAP[value].symbol;
  }, [value, tokens, symbol, customTokenName]);

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

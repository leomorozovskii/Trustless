import React, { memo, useMemo, useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import s from './Select.module.scss';
import { ChevronDownIcon } from '@radix-ui/themes';
import { EthAsset, UsdtAsset, WethAsset } from '@assets/tokens';

export interface ISelect {
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const Select: React.FC<ISelect> = ({
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handle = (token: string) => {
    onChange(token);
    setOpened(false);
  };

  const arr = [
    {
      token: 'ETH',
      icon: <EthAsset />,
    },
    {
      token: 'USDT',
      icon: <UsdtAsset />,
    },
    {
      token: 'WETH',
      icon: <WethAsset />,
    },
  ];

  const valueIcon = useMemo(() => {
    if (!value) return;
    return arr.find((el) => el.token === value).icon;
  }, [value]);

  return (
    <div className={s.wrapper}>
      <RadixSelect.Root open={opened} disabled={disabled}>
        <RadixSelect.Trigger
          onClick={() => setOpened(!opened)}
          className={s.trigger}
        >
          <RadixSelect.Value
            placeholder={
              value ? (
                <div className={s.selectedItem}>
                  {valueIcon}
                  {value}
                </div>
              ) : (
                placeholder
              )
            }
          ></RadixSelect.Value>
          <RadixSelect.Icon>
            <ChevronDownIcon />
          </RadixSelect.Icon>
          {opened && (
            <div className={s.content}>
              {arr.map((el) => (
                <div
                  onClick={() => handle(el.token)}
                  key={el.token}
                  className={s.item}
                >
                  {el.icon}
                  <p className={s.label}>{el.token}</p>
                </div>
              ))}
            </div>
          )}
        </RadixSelect.Trigger>
      </RadixSelect.Root>
    </div>
  );
};

export default memo(Select);

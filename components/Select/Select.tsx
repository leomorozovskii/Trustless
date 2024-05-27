import React, { memo, useMemo, useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import s from './Select.module.scss';
import { ChevronDownIcon } from '@radix-ui/themes';
import { TOKEN_MAP } from '@lib/constants';

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

  const IconComponent = useMemo(() => {
    if (!value) return;
    return Object.values(TOKEN_MAP).find((el) => el.name === value).logo;
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
                  <IconComponent />
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
              {Object.values(TOKEN_MAP).map((el) => (
                <div
                  onClick={() => handle(el.name)}
                  key={el.name}
                  className={s.item}
                >
                  <el.logo />
                  <p className={s.label}>{el.name}</p>
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

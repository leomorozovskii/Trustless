import React, { memo, useMemo, useState } from 'react';
import cn from 'classnames';

import { SelectIcon } from '@assets/icons';
import { IconProps } from '@assets/icons/tokens';
import { SelectTokenPopup } from '@components/SelectTokenPopup';
import { TOKEN_MAP } from '@lib/constants';

import s from './Select.module.scss';

export interface ISelect {
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const Select: React.FC<ISelect> = ({ placeholder, value, onChange, disabled }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handle = (token: string) => {
    onChange(token);
    setOpened(false);
  };

  const IconComponent: React.FC<IconProps> | undefined = useMemo(() => {
    if (!value) return;
    const item = Object.values(TOKEN_MAP).find((el) => el.name === value);
    if (!item) return;
    return item.logo;
  }, [value]);

  return (
    <div className={s.wrapper}>
      <button onClick={() => setOpened(true)} className={cn(s.trigger, disabled && s.disabled)}>
        <div>
          {value ? (
            <div className={s.selectedItem}>
              {IconComponent && <IconComponent />}
              {value}
            </div>
          ) : (
            placeholder
          )}
        </div>
        <SelectIcon />
      </button>
      {opened && <SelectTokenPopup setOpened={setOpened} handle={handle} />}
    </div>
  );
};

export default memo(Select);

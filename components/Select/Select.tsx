import React, { memo, useMemo, useState } from 'react';
import s from './Select.module.scss';
import { TOKEN_MAP } from '@lib/constants';
import { SelectTokenPopup } from '@components/SelectTokenPopup';
import { SelectIcon } from '@assets/icons';
import cn from 'classnames';

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
    console.log(token);
    onChange(token);
    setOpened(false);
  };

  const IconComponent = useMemo(() => {
    if (!value) return;
    return Object.values(TOKEN_MAP).find((el) => el.name === value).logo;
  }, [value]);

  return (
    <div className={s.wrapper}>
      <div
        className={cn(s.trigger, disabled && s.disabled)}
        onClick={() => setOpened(true)}
      >
        <div>
          {value ? (
            <div className={s.selectedItem}>
              <IconComponent />
              {value}
            </div>
          ) : (
            placeholder
          )}
        </div>
        <SelectIcon />
      </div>
      {opened && <SelectTokenPopup setOpened={setOpened} handle={handle} />}
    </div>
  );
};

export default memo(Select);

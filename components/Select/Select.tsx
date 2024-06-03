import React, { memo, useMemo, useState } from 'react';
import cn from 'classnames';

import { SelectIcon } from '@assets/icons';
import { IconProps, UnknownIcon } from '@assets/icons/tokens';
import { SelectTokenPopup } from '@components/SelectTokenPopup';
import { useOfferContext } from '@context/offer/OfferContext';
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
  const { customTokenName } = useOfferContext();

  const handle = (tokenAddress: string) => {
    onChange(tokenAddress);
    setOpened(false);
  };

  const IconComponent: React.FC<IconProps> | undefined = useMemo(() => {
    if (!value) return;
    const item = TOKEN_MAP[value];
    if (!item) return UnknownIcon;
    return item.logo;
  }, [value]);

  const tokenTitle = useMemo(() => {
    if (!value) return;
    const notImported = TOKEN_MAP[value]?.name;
    if (!notImported) return customTokenName;
    return TOKEN_MAP[value].name;
  }, [value]);

  return (
    <div className={s.wrapper}>
      <button onClick={() => setOpened(true)} className={cn(s.trigger, disabled && s.disabled)}>
        <div>
          {value ? (
            <div className={s.selectedItem}>
              {IconComponent && <IconComponent />}
              {tokenTitle}
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

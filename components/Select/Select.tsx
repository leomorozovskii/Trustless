import React, { useMemo, useState } from 'react';
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
}

const Select: React.FC<ISelect> = ({ placeholder, value, onChange, disabled }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { customTokenName } = useOfferCreateContext();

  const handleSelectToken = (tokenAddress: string) => {
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
              {IconComponent && <IconComponent />}
              {tokenTitle}
            </div>
          ) : (
            placeholder
          )}
        </div>
        <SelectIcon />
      </button>
      {opened && <SelectTokenPopup setOpened={setOpened} handleSelectToken={handleSelectToken} />}
    </div>
  );
};

export default Select;

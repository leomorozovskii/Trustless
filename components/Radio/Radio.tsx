'use client';

import React, { memo } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

import s from './Radio.module.scss';

export interface IRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface IRadio {
  options: IRadioOption[];
  onChange(value: string): void;
  defaultValue?: string;
}

const Radio: React.FC<IRadio> = ({ options, onChange, defaultValue }) => {
  const handleOptionChange = (value: string) => {
    onChange(value);
  };

  return (
    <RadixRadioGroup.Root
      onValueChange={handleOptionChange}
      defaultValue={defaultValue}
    >
      {options.map((el) => (
        <div className={s.wrapper} key={el.value}>
          <RadixRadioGroup.Item
            className={s.radio}
            disabled={el.disabled}
            value={el.value}
            id={el.value}
          >
            <div className={s.indicator} />
          </RadixRadioGroup.Item>
          <label className={s.label} htmlFor={el.value}>
            {el.label}
          </label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  );
};

export default memo(Radio);

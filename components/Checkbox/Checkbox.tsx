'use client';

import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

import { CheckboxCheck } from '@assets/icons';

import s from './Checkbox.module.scss';

export interface ICheckbox extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = ({ label, checked, defaultChecked, onCheckedChange, disabled, ...props }) => {
  return (
    <div className={s.wrapper}>
      <RadixCheckbox.Root
        className={s.root}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        checked={checked}
        defaultChecked={defaultChecked}
        id={props.id}
      >
        <RadixCheckbox.Indicator>
          <CheckboxCheck className={s.check} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {!!label && (
        <label className={s.label} htmlFor={props.id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
